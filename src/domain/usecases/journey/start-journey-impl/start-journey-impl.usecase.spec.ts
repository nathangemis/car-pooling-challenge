/**
 * 
 * @group unit
 * 
 */

import { CarDto } from "../../../../adapters/dto/car/car.dto"
import { CreateCarDto } from "../../../../adapters/dto/car/create-car.dto"
import { GroupDto } from "../../../../adapters/dto/group/group.dto"
import { JourneyRepositoryImpl } from "../../../../adapters/repositories/journey/journey-impl.repository"
import { JourneyDataSourceMock } from "../../../../data/mocks/journey.datasource.mock"
import { IJourneyRepository } from "../../../base/repositories/journey.repository"
import { StartJourneyUsecaseImpl } from "./start-journey-impl.usecase"


describe("StartJourneyUsecase", () => {


    let journeyRepository : IJourneyRepository
    let startJourneyUsecaseImpl : StartJourneyUsecaseImpl
    let car : CreateCarDto 
    
    let groups : GroupDto[] 

    beforeAll(() => {
        const journeyDataSourceMock = new JourneyDataSourceMock()
        journeyRepository = new JourneyRepositoryImpl(journeyDataSourceMock)
        startJourneyUsecaseImpl = new StartJourneyUsecaseImpl(journeyRepository)
         car = {
            id : 1,
            seats: 5,
        }
        
        groups = [{
            id: 2,
            people: 3
        }]
    })


    test("should return true when a group match with a car",async () => {
        const result = await startJourneyUsecaseImpl.execute(groups,car)
        expect(result).toBe(true)
    })

    test("should JourneyRepository joinManyGroupWithCar() be called with right data",async () => {
        jest.spyOn(journeyRepository,"joinManyGroupWithCar").mockImplementation(() => Promise.resolve(true))
        await startJourneyUsecaseImpl.execute(groups,car)
        expect(journeyRepository.joinManyGroupWithCar).toHaveBeenCalledWith(groups,car)
    })





})