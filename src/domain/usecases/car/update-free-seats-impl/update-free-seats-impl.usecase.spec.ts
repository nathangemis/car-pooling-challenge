/**
 * 
 * @group unit
 * 
 */

import { CarDto } from "../../../../adapters/dto/car/car.dto"
import { CarRepositoryImpl } from "../../../../adapters/repositories/car/car-impl.repository"
import { CarDataSourceMock } from "../../../../data/mocks/car.datasource.mock"
import { UpdateFreeSeatsUsecaseImpl } from "./update-free-seats-impl.usecase"


describe("UpdateFreeSeatsUsecaseImpl",() => {



    let updateFreeSeatsUsecaseImpl : UpdateFreeSeatsUsecaseImpl
    let carRepositoryImpl : CarRepositoryImpl
    
    
    beforeAll(() => {
        const carDataSourceMock = new CarDataSourceMock()
        carRepositoryImpl = new CarRepositoryImpl(carDataSourceMock)
        updateFreeSeatsUsecaseImpl = new UpdateFreeSeatsUsecaseImpl(carRepositoryImpl)
    })

    test("should update the number of freeseats and return a CarDto", async () => {
        const carDto : CarDto = {
            id: 4,
            seats: 5,
            freeSeats: 3
        }
        const result = await updateFreeSeatsUsecaseImpl.execute(carDto)
        expect(result).toBeInstanceOf(CarDto)
        expect(result?.freeSeats).toBe(carDto.freeSeats)
    })
    test("should updateCar in carRepositoryImpl be called with right data", async () => {
        jest.spyOn(carRepositoryImpl,"updateCar").mockImplementation(() => Promise.resolve(null))
        const carDto : CarDto = {
            id: 4,
            seats: 5,
            freeSeats: 3
        }
        await updateFreeSeatsUsecaseImpl.execute(carDto)
        expect(carRepositoryImpl.updateCar).toHaveBeenCalledWith(carDto)
    })
})