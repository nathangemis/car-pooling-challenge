/**
 * 
 * @group unit
 * 
 */

import { CarResponseDto } from "../../../../adapters/dto/car/CarResponse.dto"
import { JourneyRepositoryImpl } from "../../../../adapters/repositories/journey/journey-impl.repository"
import { JourneyDataSourceMock } from "../../../../data/mocks/journey.datasource.mock"
import { CarEntity } from "../../../entities/car.entity"
import { GroupEntity } from "../../../entities/group.entity"
import { FindGroupInJourneyUsecaseImpl } from "./find-group-in-journey-impl.usecase"


describe("FindGroupInJourneyUsecaseImpl", () => {

    let journeyRepositoryImpl : JourneyRepositoryImpl
    let findGroupInJourneyUsecaseImpl : FindGroupInJourneyUsecaseImpl


    beforeAll(() => {
        const journeyDataSourceMock = new JourneyDataSourceMock()
        journeyRepositoryImpl = new JourneyRepositoryImpl(journeyDataSourceMock)
        findGroupInJourneyUsecaseImpl = new FindGroupInJourneyUsecaseImpl(journeyRepositoryImpl)
    })

    test("should return a CarResponseDto if find a group", async  () => {
        const result = await findGroupInJourneyUsecaseImpl.execute(11)
        expect(result).toBeInstanceOf(Map<string, GroupEntity | CarEntity>)
    })

    test("should return null if doesnt' find a group", async  () => {
        const result = await findGroupInJourneyUsecaseImpl.execute(20)
        expect(result).toBe(null)
    })

    test("should JourneyRepositoryImpl findGroupById() be called with right data", async  () => {
        const input = 20
        jest.spyOn(journeyRepositoryImpl,"findGroupById").mockImplementation(() => Promise.resolve(null))
        const result = await findGroupInJourneyUsecaseImpl.execute(input)
        expect(journeyRepositoryImpl.findGroupById).toHaveBeenCalledWith(input)
    })



    



})