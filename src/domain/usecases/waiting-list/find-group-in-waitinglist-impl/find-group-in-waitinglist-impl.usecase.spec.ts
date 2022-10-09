/**
 * 
 * @group unit
 * 
 */

import { GroupDto } from "../../../../adapters/dto/group/group.dto"
import { WaitingListRepositoryImpl } from "../../../../adapters/repositories/waiting-list/waiting-list-impl.repository"
import { WaitingListDataSourceMock } from "../../../../data/mocks/waiting-list.datasource.mock"
import { FindGroupInWaitingListUsecaseImpl } from "./find-group-in-waitinglist-impl.usecase"

describe("FindGroupInWaitingListUsecase",() => {

    let waitingListRepositoryImpl : WaitingListRepositoryImpl
    let findGroupInWaitingListUsecaseImpl : FindGroupInWaitingListUsecaseImpl

    beforeAll(() => {
        const waitingListDataSourceMock = new WaitingListDataSourceMock()
        waitingListRepositoryImpl = new WaitingListRepositoryImpl(waitingListDataSourceMock)
        findGroupInWaitingListUsecaseImpl = new FindGroupInWaitingListUsecaseImpl(waitingListRepositoryImpl)
    })

    test("should return a GroupDto if find a group", async () => {
        const result = await findGroupInWaitingListUsecaseImpl.execute(9)
        expect(result).toBeInstanceOf(GroupDto)
    })

    test("should return null if don't find a group", async () => {
        const result = await findGroupInWaitingListUsecaseImpl.execute(20)
        expect(result).toBe(null)
    })


    test("should waitingListRepositoryImpl call findGroupById() with right data", async () => {
        const input = 4
        jest.spyOn(waitingListRepositoryImpl,"findGroupById").mockImplementation(() => Promise.resolve(null))
        await findGroupInWaitingListUsecaseImpl.execute(input)
        expect(waitingListRepositoryImpl.findGroupById).toHaveBeenCalledWith(input)


    })
})