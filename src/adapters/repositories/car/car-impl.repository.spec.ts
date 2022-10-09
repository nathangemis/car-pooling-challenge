/**
 * 
 * @group unit
 * 
 */



import { CarDataSourceMock } from "../../../data/mocks/car.datasource.mock"
import { ICarRepository } from "../../../domain/base/repositories/car.repository"
import { CarEntity } from "../../../domain/entities/car.entity"
import { CarDto } from "../../dto/car/car.dto"
import { CreateCarDto } from "../../dto/car/create-car.dto"
import { CarRepositoryImpl } from "./car-impl.repository"

describe("Car Repository Impl", () => {

    let carRepositoryImpl: ICarRepository
    let carDataSourceMock: CarDataSourceMock
    let cars: CreateCarDto[]

    beforeEach(() => {
        carDataSourceMock = new CarDataSourceMock()
        carRepositoryImpl = new CarRepositoryImpl(carDataSourceMock)
        cars = [{
            id: 1,
            seats: 5,
        }, {
            id: 2,
            seats: 6,
        }]
    })

    test("should return true when putCars", async () => {
        const result = await carRepositoryImpl.putCars(cars)
        expect(result).toBe(true)
    })

    test("should call createMany in CarDataSource", async () => {
        jest.spyOn(carDataSourceMock, "createMany").mockImplementation(() => Promise.resolve())
        await carRepositoryImpl.putCars(cars);
        expect(carDataSourceMock.createMany).toHaveBeenCalledWith(cars)
    })

    test("should getCarByFreeSeat return a CarEntity when there is enough free seats", async () => {
        const result = await carRepositoryImpl.getCarByFreeSeat(3)
        expect(result).toBeInstanceOf(CarEntity)
        expect(result).toHaveProperty("freeSeats")
        expect(result?.freeSeats).toBeGreaterThanOrEqual(3)
    })

    test("should getCarById return a CarEntity if there is one with this id", async () => {
        const id = 3
        const result = await carRepositoryImpl.getCarById(3)

        expect(result).toBeInstanceOf(CarEntity)
        expect(result?.id).toBe(id)
    })

    test("should call getOne in CarDataSource with the right param", async () => {
        jest.spyOn(carDataSourceMock, "getOne").mockImplementation(() => Promise.resolve(null))
        await carRepositoryImpl.getCarByFreeSeat(3)
        expect(carDataSourceMock.getOne).toHaveBeenCalledWith({freeSeats : 3})
    })

    test("should updateCar() return an updated carEntity", async () => {
        const carDto : CarDto = {
            id: 4,
            seats: 5,
            freeSeats: 3
        }
        const result = await carRepositoryImpl.updateCar(carDto)
        const oldCarEntity = carDataSourceMock.cars.get(carDto.seats)?.get(carDto.id)
        const newCar = carDataSourceMock.cars.get(carDto.freeSeats as number)?.get(carDto.id)
        expect(result).toBeInstanceOf(CarEntity)
        expect(oldCarEntity).toBeUndefined()
        expect(newCar).toBeInstanceOf(CarEntity)
    })

    test("should call update in CarDataSource with the right param", async () => {
        const carDto : CarDto = {
            id: 4,
            seats: 5,
            freeSeats: 3
        }
        jest.spyOn(carDataSourceMock, "update").mockImplementation(() => Promise.resolve(null))
        await carRepositoryImpl.updateCar(carDto)
        expect(carDataSourceMock.update).toHaveBeenCalledWith(carDto)
    })

    test("should resetData return true whan cars data is empty",async  () => {
        const result = await carRepositoryImpl.resetData()
        expect(result).toBe(true)
        expect(carDataSourceMock.cars.size).toBe(0)
    })
})