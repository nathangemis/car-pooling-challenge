/**
 * 
 * @group unit
 * 
 */

import { CarRepositoryImpl } from "../../../../adapters/repositories/car/car-impl.repository"
import { CarDataSourceMock } from "../../../../data/mocks/car.datasource.mock"
import { ResetCarsDataUsecaseImpl } from "./reset-cars-data-impl.usecase"


describe("ResetCarsDataUsecase", () => {

    let carRepositoryImpl : CarRepositoryImpl
    let resetCarsDataUsecaseImpl : ResetCarsDataUsecaseImpl



    beforeAll(() => {
        const carDataSourceMock = new CarDataSourceMock()
        carRepositoryImpl = new CarRepositoryImpl(carDataSourceMock)
        resetCarsDataUsecaseImpl  = new ResetCarsDataUsecaseImpl(carRepositoryImpl)
    })

    test("should reset the cars data Map", async () => {
        const result = await resetCarsDataUsecaseImpl.execute()
        expect(result).toBe(true)
    })

    test("should CarRepositoryImpl resetData() be called",async () => {
        jest.spyOn(carRepositoryImpl,"resetData").mockImplementation(() => Promise.resolve(true))
        await resetCarsDataUsecaseImpl.execute()
        expect(carRepositoryImpl.resetData).toHaveBeenCalled()
        
    })
})