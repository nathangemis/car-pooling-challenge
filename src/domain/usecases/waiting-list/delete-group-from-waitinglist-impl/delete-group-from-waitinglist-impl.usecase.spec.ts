/**
 * 
 * @group unit
 * 
 */

import { WaitingListRepositoryImpl } from "../../../../adapters/repositories/waiting-list/waiting-list-impl.repository"
import { WaitingListDataSourceMock } from "../../../../data/mocks/waiting-list.datasource.mock"
import { IWaitingListRepository } from "../../../base/repositories/waiting-list.repository"
import { IUseCase } from "../../../base/usecase"
import { DeleteGroupFromWaitingListUsecaseImpl } from "./delete-group-from-waitinglist-impl.usecase"



describe("DeleteGroupFromWaitingListUsecase", () => {

    let waitingListRepository : IWaitingListRepository
    let deleteGroupFromWaitingListUsecase : IUseCase<boolean>

    beforeAll(() => {
        const waitingListDataSourceMock = new WaitingListDataSourceMock()
        waitingListRepository = new WaitingListRepositoryImpl(waitingListDataSourceMock)
        deleteGroupFromWaitingListUsecase = new DeleteGroupFromWaitingListUsecaseImpl(waitingListRepository)
    })

    test("should return true if element is find and delete", async () => {
        const result = await deleteGroupFromWaitingListUsecase.execute(3)
        expect(result).toBe(true)
    })

    test("should waitingListRepository deleteGroup() be called with right data", async () => {
        const input = 3
        jest.spyOn(waitingListRepository,"deleteGroup").mockImplementation(() => Promise.resolve(true))
        await deleteGroupFromWaitingListUsecase.execute(input)
        expect(waitingListRepository.deleteGroup).toHaveBeenCalledWith(input)

    })  



})