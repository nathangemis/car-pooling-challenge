/**
 * 
 * @group unit
 * 
 */

import { CarDto } from "../../../../adapters/dto/car/car.dto"
import { CarRepositoryImpl } from "../../../../adapters/repositories/car/car-impl.repository"
import { CarDataSource } from "../../../../data/in-memory/car.datasource"
import { CarDataSourceMock } from "../../../../data/mocks/car.datasource.mock"
import { ICarRepository } from "../../../base/repositories/car.repository"
import { IUseCase } from "../../../base/usecase"
import { GetCarByIdUsecaseImpl } from "./get-car-by-id.usecase"

describe("Get Car By Id Usecase", () => {

    let carRepositoryImpl : ICarRepository
    let getCarByIdUsecaseImpl : IUseCase<CarDto | null>
    let id : number
    

    beforeAll(() => {
        const carDataSource = new CarDataSourceMock()
        carRepositoryImpl = new CarRepositoryImpl(carDataSource)
        getCarByIdUsecaseImpl = new GetCarByIdUsecaseImpl(carRepositoryImpl)
        id = 3
    })

    test("should return a CarDto if car exist", async () => {
        const result = await getCarByIdUsecaseImpl.execute(id)

        expect(result).toBeInstanceOf(CarDto)
        expect(result?.id).toBe(id)
    })

    test("should return null if car doesn't exist exist", async () => {
        id = 10
        const result = await getCarByIdUsecaseImpl.execute(id)

        expect(result).not.toBeInstanceOf(CarDto)
        expect(result).toBe(null)
    })

    test("should carRepositoryImpl getCarById() be called with righ data", async () => {
        jest.spyOn(carRepositoryImpl, "getCarById").mockImplementation(() => Promise.resolve(null))
        await getCarByIdUsecaseImpl.execute(id)
        expect(carRepositoryImpl.getCarById).toHaveBeenCalledWith(id)
    })




})