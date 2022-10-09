/**
 * 
 * @group unit
 * 
 */



import { CarDto } from "../../../../adapters/dto/car/car.dto"
import { CreateCarDto } from "../../../../adapters/dto/car/create-car.dto"
import { CarRepositoryImpl } from "../../../../adapters/repositories/car/car-impl.repository"
import { CarDataSource } from "../../../../data/in-memory/car.datasource"
import { CarDataSourceMock } from "../../../../data/mocks/car.datasource.mock"
import { PutCarsUsecaseImpl } from "./put-cars-impl.usecase"

describe("Put Cars Impl Usecase", () => {


    let putCarsUsecaseImpl : PutCarsUsecaseImpl
    let carRepositoryImpl : CarRepositoryImpl
    let data : CreateCarDto[]


    beforeAll(() => {
        const carDataSource = new CarDataSource()
        carRepositoryImpl = new CarRepositoryImpl(carDataSource)
        putCarsUsecaseImpl = new PutCarsUsecaseImpl(carRepositoryImpl)
        data =  [{ id: 2, seats: 34 }, { id: 1, seats: 5 }, { id: 5, seats: 0 }]
    })

    test("should PutCarsUsecaseImpl execute() function return true", async () => {
        const result = await putCarsUsecaseImpl.execute(data)
        expect(result).toBe(true)
    })

    test("should CarRepositoryImpl putCars() be called with right data", async () => {
        jest.spyOn(carRepositoryImpl, "putCars").mockImplementation(() => Promise.resolve(true))
        await putCarsUsecaseImpl.execute(data)
        expect(carRepositoryImpl.putCars).toHaveBeenCalledWith(data)
    })
})