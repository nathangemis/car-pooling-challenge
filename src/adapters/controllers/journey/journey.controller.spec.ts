/**
 * 
 * @group unit 
 *
 */

import { JourneyDataSource } from "../../../data/in-memory/journey.datasource";
import { DataSource } from "../../../domain/base/dataSource";
import { IJourneyRepository } from "../../../domain/base/repositories/journey.repository";
import { IUseCase } from "../../../domain/base/usecase";
import { StartJourneyUsecaseImpl } from "../../../domain/usecases/journey/start-journey-impl/start-journey-impl.usecase";
import server from "../../../server";
import { GroupDto } from "../../dto/group/group.dto";
import { JourneyRepositoryImpl } from "../../repositories/journey/journey-impl.repository";
import request  from 'supertest'
import JourneyController from "./journey.controller";
import { GetCarByFreeSeatUsecaseImpl } from "../../../domain/usecases/car/get-car-by-free-seat-impl/get-car-by-free-seat-impl.usecase";
import { AddGroupToWaitingListUsecaseImpl } from "../../../domain/usecases/waiting-list/add-group-to-waitinglist-impl/add-group-to-waitinglist-impl.usecase";
import { WaitingListRepositoryImpl } from "../../repositories/waiting-list/waiting-list-impl.repository";
import { WaitingListDataSource } from "../../../data/in-memory/waiting-list.datasource";
import { CarDataSource } from "../../../data/in-memory/car.datasource";
import { CarRepositoryImpl } from "../../repositories/car/car-impl.repository";
import { UpdateFreeSeatsUsecaseImpl } from "../../../domain/usecases/car/update-free-seats-impl/update-free-seats-impl.usecase";
import { FindGroupInJourneyUsecaseImpl } from "../../../domain/usecases/journey/find-group-in-journey-impl/find-group-in-journey-impl.usecase";



describe("Journey Controller", () => {
    let journeyDataSource: DataSource<any>;
    let journeyRepositoryImpl: IJourneyRepository
    let startJourneyUsecaseImpl: IUseCase<boolean>
    let data: GroupDto

    beforeAll(() => {
        journeyDataSource = new JourneyDataSource()
        journeyRepositoryImpl = new JourneyRepositoryImpl(journeyDataSource)
        const journeyRepository = new JourneyRepositoryImpl(new JourneyDataSource())
        const waitingListRepository = new WaitingListRepositoryImpl(new WaitingListDataSource())
        const carRepository = new CarRepositoryImpl(new CarDataSource())
        const getCarByFreeSeatUsecaseImpl = new GetCarByFreeSeatUsecaseImpl(carRepository)
        const updateFreeSeatsUsecaseImpl = new UpdateFreeSeatsUsecaseImpl(carRepository)
        const addGroupToWaitingListUsecaseImpl = new AddGroupToWaitingListUsecaseImpl(waitingListRepository)
        const startJourneyUsecaseImpl = new StartJourneyUsecaseImpl(journeyRepositoryImpl)
        const findGroupInJourneyUsecaseImpl = new FindGroupInJourneyUsecaseImpl(journeyRepositoryImpl)

        
        server.use("/journey", JourneyController(startJourneyUsecaseImpl, getCarByFreeSeatUsecaseImpl,updateFreeSeatsUsecaseImpl,addGroupToWaitingListUsecaseImpl,findGroupInJourneyUsecaseImpl))
        data = { id: 1, people: 4 }
    })

    test("POST /journey should return 500 if data is not valid", async () => {
        const response = await request(server).post("/journey").send("Helllo")
        expect(response.status).toBe(400)

    })
    test("PUT /journey should return 200 if data is valid", async () => {
        const response = await request(server).post("/journey").send(data)
        expect(response.status).toBe(200)
    })
})