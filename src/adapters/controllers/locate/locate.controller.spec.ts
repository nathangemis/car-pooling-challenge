/**
 * 
 * @group unit
 * 
 */

import { JourneyDataSourceMock } from "../../../data/mocks/journey.datasource.mock"
import { WaitingListDataSourceMock } from "../../../data/mocks/waiting-list.datasource.mock"
import { FindGroupInJourneyUsecaseImpl } from "../../../domain/usecases/journey/find-group-in-journey-impl/find-group-in-journey-impl.usecase"
import { FindGroupInWaitingListUsecaseImpl } from "../../../domain/usecases/waiting-list/find-group-in-waitinglist-impl/find-group-in-waitinglist-impl.usecase"
import server from "../../../server"
import { JourneyRepositoryImpl } from "../../repositories/journey/journey-impl.repository"
import { WaitingListRepositoryImpl } from "../../repositories/waiting-list/waiting-list-impl.repository"
import LocateController from "./locate.controller"
import request from "supertest"


describe("LocateContoller", () => {

    let findGroupInWaitingListUsecaseImpl: FindGroupInWaitingListUsecaseImpl
    let findGroupInJourneyUsecaseImpl: FindGroupInJourneyUsecaseImpl


    beforeAll(() => {
        const journeyDataSourceMock = new JourneyDataSourceMock()
        const journeyRepository = new JourneyRepositoryImpl(journeyDataSourceMock)
        const waitingListDataSourceMock = new WaitingListDataSourceMock()
        const waitingListRepositoryImpl = new WaitingListRepositoryImpl(waitingListDataSourceMock)

        findGroupInWaitingListUsecaseImpl = new FindGroupInWaitingListUsecaseImpl(waitingListRepositoryImpl)
        findGroupInJourneyUsecaseImpl = new FindGroupInJourneyUsecaseImpl(journeyRepository)
        server.use("/locate", LocateController(findGroupInJourneyUsecaseImpl, findGroupInWaitingListUsecaseImpl))
    })


    test("POST /locate should return 404 when the group is not found", async () =>{        
        const response = await request(server).post("/locate").send("ID=13").set('Accept', 'application/json')
        expect(response.statusCode).toBe(404)
    })  

    test("POST /locate  should return 204 when the group is in waiting to be assigned to a car", async () => {
        const response = await request(server).post("/locate").send("ID=9").set('Accept', 'application/json')
        expect(response.statusCode).toBe(204)
    })


    test(" POST /locate should return 200 and the car where the group is assigned", async () => {
        const car = {id: 1, seats: 6}
        const response = await request(server).post("/locate").send("ID=11").set('Accept', 'application/json')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(car)
    })
})