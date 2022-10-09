/**
 * 
 * @group unit
 * 
 */



import { JourneyDataSourceMock } from "../../../data/mocks/journey.datasource.mock"
import { WaitingListDataSourceMock } from "../../../data/mocks/waiting-list.datasource.mock"
import { StopJourneyUsecaseImpl } from "../../../domain/usecases/journey/stop-journey-impl/stop-journey-impl.usecase"
import { DeleteGroupFromWaitingListUsecaseImpl } from "../../../domain/usecases/waiting-list/delete-group-from-waitinglist-impl/delete-group-from-waitinglist-impl.usecase"
import { SearchGroupByPeopleUsecaseImpl } from "../../../domain/usecases/waiting-list/search-group-by-people-impl/search-group-by-people-impl.usecase"
import { JourneyRepositoryImpl } from "../../repositories/journey/journey-impl.repository"
import { WaitingListRepositoryImpl } from "../../repositories/waiting-list/waiting-list-impl.repository"
import DropOffController from "./dropoff.controller"
import server from "../../../server"
import request from "supertest"
import { CarDataSourceMock } from "../../../data/mocks/car.datasource.mock"
import { CarRepositoryImpl } from "../../repositories/car/car-impl.repository"
import { GetCarByIdUsecaseImpl } from "../../../domain/usecases/car/get-car-by-id-impl/get-car-by-id.usecase"
import { StartJourneyUsecaseImpl } from "../../../domain/usecases/journey/start-journey-impl/start-journey-impl.usecase"
import { UpdateFreeSeatsUsecaseImpl } from "../../../domain/usecases/car/update-free-seats-impl/update-free-seats-impl.usecase"

describe("DropOffController", () => {

    beforeAll(() => {
        const journeyDataSourceMock = new JourneyDataSourceMock()
        const waitingListDataSourceMock = new WaitingListDataSourceMock
        const carDataSourceMock = new CarDataSourceMock()

        const journeyRepositoryImpl = new JourneyRepositoryImpl(journeyDataSourceMock)
        const waitingListRepositoryImpl = new WaitingListRepositoryImpl(waitingListDataSourceMock)
        const carRepositoryImpl = new CarRepositoryImpl(carDataSourceMock)

        const stopJourneyUsecaseImpl = new StopJourneyUsecaseImpl(journeyRepositoryImpl)
        const startJourneyUsecaseImpl = new StartJourneyUsecaseImpl(journeyRepositoryImpl)
        const deleteGroupFromWaitingListUsecaseImpl = new DeleteGroupFromWaitingListUsecaseImpl(waitingListRepositoryImpl)
        const searchGroupByPeopleUsecaseImpl = new SearchGroupByPeopleUsecaseImpl(waitingListRepositoryImpl)
        const getCarByIdUsecaseImpl = new GetCarByIdUsecaseImpl(carRepositoryImpl)
        const updateFreeSeatsUsecaseImpl = new UpdateFreeSeatsUsecaseImpl(carRepositoryImpl)

        server.use("/dropoff", DropOffController(stopJourneyUsecaseImpl,
            startJourneyUsecaseImpl,
            deleteGroupFromWaitingListUsecaseImpl,
            searchGroupByPeopleUsecaseImpl,
            getCarByIdUsecaseImpl,
            updateFreeSeatsUsecaseImpl))
    })

    test("should return 404 if group is not find and can't be deleted", async () => {
        const response = await request(server).post("/dropoff").send("ID=35")
        expect(response.statusCode).toBe(404)
    })
    test("should return 200 when group is unregistred", async () => {
        const response = await request(server).post("/dropoff").send("ID=11")
        expect(response.statusCode).toBe(200)
    })
})