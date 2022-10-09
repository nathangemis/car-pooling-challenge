/**
 * 
 * @group unit
 * 
 */

import { GroupDto } from "../../../../adapters/dto/group/group.dto"
import { WaitingListRepositoryImpl } from "../../../../adapters/repositories/waiting-list/waiting-list-impl.repository"
import { WaitingListDataSourceMock } from "../../../../data/mocks/waiting-list.datasource.mock"
import { IWaitingListRepository } from "../../../base/repositories/waiting-list.repository"
import { GroupEntity } from "../../../entities/group.entity"
import { AddGroupToWaitingListUsecaseImpl } from "./add-group-to-waitinglist-impl.usecase"

describe("Add Group To Waiting List", () => {


    let addGroupToWaitingListUsecase : AddGroupToWaitingListUsecaseImpl
    let waitingListRepositoryImpl : IWaitingListRepository


    beforeAll(() => {
        const waitingListDataSourceMock = new WaitingListDataSourceMock()
        waitingListRepositoryImpl = new WaitingListRepositoryImpl(waitingListDataSourceMock)
        addGroupToWaitingListUsecase = new AddGroupToWaitingListUsecaseImpl(waitingListRepositoryImpl)
    })


    test("should return a GroupDto",async  () => {
        const data : GroupDto = {
            id: 1,
            people: 5
        }
        const result = await addGroupToWaitingListUsecase.execute(data)
        expect(result).toBeInstanceOf(GroupDto)
    })

    test("should GroupeRepositoryImpl addGroup() receive right data",async () => {
        const data : GroupEntity = {
            id: 1,
            people: 5,
            addedAt : new Date()
        }
        jest.spyOn(waitingListRepositoryImpl,"addGroup").mockImplementation(() => Promise.resolve(data))
        await addGroupToWaitingListUsecase.execute(new GroupDto(data))
        expect(waitingListRepositoryImpl.addGroup).toHaveBeenCalledWith(new GroupDto(data))
    })
})