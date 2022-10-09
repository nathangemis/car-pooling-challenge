/**
 * 
 * @group unit 
 *
 */

import server from "../../../server"
import request from "supertest"
import CarController from "./car.controller"
import { PutCarsUsecaseImpl } from "../../../domain/usecases/car/put-cars-impl/put-cars-impl.usecase"
import { CarRepositoryImpl } from "../../repositories/car/car-impl.repository"
import { CreateCarDto } from "../../dto/car/create-car.dto"
import { ResetCarsDataUsecaseImpl } from "../../../domain/usecases/car/reset-cars-data-impl/reset-cars-data-impl.usecase"
import { ResetJourneyDataUsecaseImpl } from "../../../domain/usecases/journey/reset-journey-data-impl/reset-journey-data-impl.usecase"
import { JourneyRepositoryImpl } from "../../repositories/journey/journey-impl.repository"
import { WaitingListRepositoryImpl } from "../../repositories/waiting-list/waiting-list-impl.repository"
import { CarDataSourceMock } from "../../../data/mocks/car.datasource.mock"
import { JourneyDataSourceMock } from "../../../data/mocks/journey.datasource.mock"
import { WaitingListDataSourceMock } from "../../../data/mocks/waiting-list.datasource.mock"
import { ResetWaitingListDataUsecaseImpl } from "../../../domain/usecases/waiting-list/reset-waitinglist-data-impl/reset-waitinglist-data-impl.usecase"

describe("Car Controller", () => {
    let putCarsUsecaseImpl : PutCarsUsecaseImpl
    let resetCarsDataUsecaseImpl :  ResetCarsDataUsecaseImpl
    let resetJourneyDataUsecaseImpl : ResetJourneyDataUsecaseImpl
    let resetWaitingListDataUsecaseImpl: ResetWaitingListDataUsecaseImpl
    let data : CreateCarDto[]

    beforeAll(() => {
        const carDataSource = new CarDataSourceMock()
        const journeyDataSource = new JourneyDataSourceMock()
        const waitingListDataSourceMock = new WaitingListDataSourceMock()
        const waitingListRepositoryImpl = new WaitingListRepositoryImpl(waitingListDataSourceMock)
        const carRepository = new CarRepositoryImpl(carDataSource)
        const journeyRepositoryImpl = new JourneyRepositoryImpl(journeyDataSource)
        putCarsUsecaseImpl = new PutCarsUsecaseImpl(carRepository)
        resetCarsDataUsecaseImpl = new ResetCarsDataUsecaseImpl(carRepository)
        resetJourneyDataUsecaseImpl = new ResetJourneyDataUsecaseImpl(journeyRepositoryImpl)
        resetWaitingListDataUsecaseImpl = new  ResetWaitingListDataUsecaseImpl(waitingListRepositoryImpl)
        server.use("/cars", CarController(putCarsUsecaseImpl,resetCarsDataUsecaseImpl,resetJourneyDataUsecaseImpl,resetWaitingListDataUsecaseImpl))
        data = [{id : 1 , seats: 4}, {id: 2, seats: 3}]
    })

    test("PUT /cars should return 500 if data is not valid", async () => {
       const response = await request(server).put("/cars").send("Helllo")
       expect(response.status).toBe(400)
        
    })
    test("PUT /cars should return 200 if data is valid", async () => {
        const response = await request(server).put("/cars").send(data)
        expect(response.status).toBe(200)
    })
    test("should ResetCarsDataUsecaseImpl be called", async () => {
        jest.spyOn(resetCarsDataUsecaseImpl,"execute").mockImplementation(() => Promise.resolve(true))
        await request(server).put("/cars").send(data)
        expect(resetCarsDataUsecaseImpl.execute).toHaveBeenCalled()
    })
    test("should ResetJourneyDataUsecaseImpl have been called", async () => {
        jest.spyOn(resetJourneyDataUsecaseImpl,"execute").mockImplementation(() => Promise.resolve(true))
        await request(server).put("/cars").send(data)
        expect(resetJourneyDataUsecaseImpl.execute).toHaveBeenCalled()
    })
    test("should resetWaitingListDataUsecaseImpl have been called", async () => {
        jest.spyOn(resetWaitingListDataUsecaseImpl,"execute").mockImplementation(() => Promise.resolve(true))
        await request(server).put("/cars").send(data)
        expect(resetWaitingListDataUsecaseImpl.execute).toHaveBeenCalled()
    })
    test("should putCarsUsecaseImpl have been called with the right data", async () => {
        jest.spyOn(putCarsUsecaseImpl,"execute").mockImplementation(() => Promise.resolve(true))
        await request(server).put("/cars").send(data)
        expect(putCarsUsecaseImpl.execute).toHaveBeenCalledWith(data)
    })
})