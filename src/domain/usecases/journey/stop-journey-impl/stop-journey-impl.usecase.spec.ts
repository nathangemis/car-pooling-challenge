/**
 * 
 * @group unit
 * 
 */

import { CarDto } from "../../../../adapters/dto/car/car.dto"
import { GroupDto } from "../../../../adapters/dto/group/group.dto"
import { JourneyRepositoryImpl } from "../../../../adapters/repositories/journey/journey-impl.repository"
import { JourneyDataSourceMock } from "../../../../data/mocks/journey.datasource.mock"
import { StopJourneyUsecaseImpl } from "./stop-journey-impl.usecase"


describe("StopJourneyUsecaseImpl",() => {

    let journeyRepositoryImpl : JourneyRepositoryImpl
    let stopJourneyUsecaseImpl : StopJourneyUsecaseImpl


    beforeAll(() => {
        const journeyDataSourceMock = new JourneyDataSourceMock()
        journeyRepositoryImpl = new JourneyRepositoryImpl(journeyDataSourceMock)
        stopJourneyUsecaseImpl = new StopJourneyUsecaseImpl(journeyRepositoryImpl)
    })

    test("should return Map of car and group when remove journey", async () => {
        const result = await stopJourneyUsecaseImpl.execute(12)
        expect(result).toBeInstanceOf(Map<string,GroupDto | CarDto>)
    })

    test("should return null if id dont exist", async () => {
        const result = await stopJourneyUsecaseImpl.execute(10)
        expect(result).toBe(null)
    })

    test("should JourneyRepositoryImpl deleteGroup() be called with right data", async () => {
        const input = 4
        jest.spyOn(journeyRepositoryImpl,"deleteGroup").mockImplementation(() => Promise.resolve(null))
        await stopJourneyUsecaseImpl.execute(input)
        expect(journeyRepositoryImpl.deleteGroup).toHaveBeenCalledWith(input)
    })
})