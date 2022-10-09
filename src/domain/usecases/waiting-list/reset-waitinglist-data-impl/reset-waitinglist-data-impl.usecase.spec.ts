/**
 * 
 * @group unit
 * 
 */

import { WaitingListRepositoryImpl } from "../../../../adapters/repositories/waiting-list/waiting-list-impl.repository"
import { WaitingListDataSourceMock } from "../../../../data/mocks/waiting-list.datasource.mock"
import { ResetWaitingListDataUsecaseImpl } from "./reset-waitinglist-data-impl.usecase"




 
 
 describe("ResetWaitingListDataUsecase", () => {
 
     let waitingListDataSourceMock :WaitingListDataSourceMock
     let waitingListRepositoryImpl : WaitingListRepositoryImpl
     let resetWaitingListDataUsecaseImpl : ResetWaitingListDataUsecaseImpl
 
 
 
     beforeAll(() => {
         waitingListDataSourceMock = new WaitingListDataSourceMock()
         waitingListRepositoryImpl = new WaitingListRepositoryImpl(waitingListDataSourceMock)
         resetWaitingListDataUsecaseImpl  = new ResetWaitingListDataUsecaseImpl(waitingListRepositoryImpl)
     })
 
     test("should reset the waitingList data Map", async () => {
         const result = await resetWaitingListDataUsecaseImpl.execute()
         expect(result).toBe(true)
     })
 })