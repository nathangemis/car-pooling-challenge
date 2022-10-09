/**
 * 
 * @group unit
 * 
 */


import { CarDto } from "../../../../adapters/dto/car/car.dto"
import { CarRepositoryImpl } from "../../../../adapters/repositories/car/car-impl.repository"
import { CarDataSourceMock } from "../../../../data/mocks/car.datasource.mock"
import { ICarRepository } from "../../../base/repositories/car.repository"
import { IUseCase } from "../../../base/usecase"
import { GetCarByFreeSeatUsecaseImpl } from "./get-car-by-free-seat-impl.usecase"

describe("Get a Car By Free Seat Usecase", () => {

    let getCarByFreeSeatImplUsecase: IUseCase<CarDto | null>
    let carRepository: ICarRepository

    beforeAll(() => {
        const carDataSourceMock = new CarDataSourceMock()
        carRepository = new CarRepositoryImpl(carDataSourceMock)
        getCarByFreeSeatImplUsecase = new GetCarByFreeSeatUsecaseImpl(carRepository)
    })

    test("should return a CarDto if there is a car with enough freeseat", async () => {
        const result = await getCarByFreeSeatImplUsecase.execute(4)
        expect(result).not.toBe(null)
        expect(result).toBeInstanceOf(CarDto)
    })

    test("should return null when don't find a car with enough freeseats", async () => {
        const result = await getCarByFreeSeatImplUsecase.execute(6)
        expect(result).not.toBeInstanceOf(CarDto)
        expect(result).toBe(null)
    })

    test("should CarRepositoryImpl getCarByFreeSeat() be called with right data", async () => {
        jest.spyOn(carRepository,"getCarByFreeSeat").mockImplementation(() => Promise.resolve(null))
        await getCarByFreeSeatImplUsecase.execute(6)
        expect(carRepository.getCarByFreeSeat).toHaveBeenCalledWith(6)
    })
})