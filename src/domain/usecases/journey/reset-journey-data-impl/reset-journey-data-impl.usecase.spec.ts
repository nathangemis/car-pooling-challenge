/**
 * 
 * @group unit
 * 
 */

import { JourneyRepositoryImpl } from "../../../../adapters/repositories/journey/journey-impl.repository"
import { JourneyDataSourceMock } from "../../../../data/mocks/journey.datasource.mock"
import { ResetJourneyDataUsecaseImpl } from "./reset-journey-data-impl.usecase"


 
 
 describe("ResetJourneyDataUsecase", () => {
 
     let journeyDataSourceMock :JourneyDataSourceMock
     let journeyRepositoryImpl : JourneyRepositoryImpl
     let resetJourneyDataUsecaseImpl : ResetJourneyDataUsecaseImpl
 
 
 
     beforeAll(() => {
         journeyDataSourceMock = new JourneyDataSourceMock()
         journeyRepositoryImpl = new JourneyRepositoryImpl(journeyDataSourceMock)
         resetJourneyDataUsecaseImpl  = new ResetJourneyDataUsecaseImpl(journeyRepositoryImpl)
     })
 
     test("should reset the journey data Map", async () => {
         const result = await resetJourneyDataUsecaseImpl.execute()
         expect(result).toBe(true)
     })
 })