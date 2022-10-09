/**
 * 
 * @group unit
 * 
 */

import { WaitingListDataSource } from "../../../data/in-memory/waiting-list.datasource"
import { WaitingListDataSourceMock } from "../../../data/mocks/waiting-list.datasource.mock"
import { IWaitingListRepository } from "../../../domain/base/repositories/waiting-list.repository"
import { GroupEntity } from "../../../domain/entities/group.entity"
import { GroupDto } from "../../dto/group/group.dto"
import { WaitingListRepositoryImpl } from "./waiting-list-impl.repository"


describe("JourneyRepositoryImpl", () => {

    let waitingListRepositoryImpl: IWaitingListRepository
    let waitingListDataSource : WaitingListDataSource

    beforeEach(() => {
        waitingListDataSource = new WaitingListDataSourceMock()
        waitingListRepositoryImpl = new WaitingListRepositoryImpl(waitingListDataSource)
    })

    test("should return a GroupEntity when call addGroup()", async () => {
        const group : GroupDto = {
            id: 2,
            people: 6
        }
        const result = await waitingListRepositoryImpl.addGroup(group)
        expect(result).toBeInstanceOf(GroupEntity)
        expect(result.id).toBe(group.id)
    })

    test("should waitingListDataSource call create() with right data", async () => {
        const data : GroupEntity = {
            id : 1,
            people: 5,
            addedAt: new Date()
        }
        jest.spyOn(waitingListDataSource,"create").mockImplementation(() => Promise.resolve(data))
        await waitingListRepositoryImpl.addGroup(new GroupDto(data))
        expect(waitingListDataSource.create).toHaveBeenCalledWith(new GroupDto(data))
    })

    test("should return a GroupEntity when call getFirstGroupByPeople() if find one", async () => {
        const result = await waitingListRepositoryImpl.getFirstGroupByPeople(3)
        expect(result).toBeInstanceOf(GroupEntity)
    })
    test("should return a null when call getFirstGroupByPeople() and not find", async () => {
        const result = await waitingListRepositoryImpl.getFirstGroupByPeople(0)
        expect(result).toBe(null)
    })

    test("should waitingListDataSource call findLessOrEqualPeople() with right data", async () => {
        const input = 4
        jest.spyOn(waitingListDataSource,"getOne").mockImplementation(() => Promise.resolve(null))
        await waitingListRepositoryImpl.getFirstGroupByPeople(input)
        expect(waitingListDataSource.getOne).toHaveBeenCalledWith({people: input})
    })

    test("should return true if entity is find and deleted", async () =>{
        const result = await waitingListRepositoryImpl.deleteGroup(4)
        expect(result).toBe(true)
    })

    test("should return false if entity can't exist and be deleted", async () =>{
        const result = await waitingListRepositoryImpl.deleteGroup(20)
        expect(result).toBe(false)
    })

    test("should waitingListDataSource call delete() with right data", async () => {
        const input = 4
        jest.spyOn(waitingListDataSource,"delete").mockImplementation(() => Promise.resolve(true))
        await waitingListRepositoryImpl.deleteGroup(input)
        expect(waitingListDataSource.delete).toHaveBeenCalledWith(input)
    })

    test("should findGroupById() return a GroupEntity if find one", async () => {
        const result = await waitingListRepositoryImpl.findGroupById(4)
        expect(result).toBeInstanceOf(GroupEntity)
    })

    test("should waitingListDataSource call getById() with right data", async () => {
        const input = 4
        jest.spyOn(waitingListDataSource, "getById").mockImplementation(() => Promise.resolve(null))
        const result = await waitingListRepositoryImpl.findGroupById(input)
        expect(waitingListDataSource.getById).toHaveBeenCalledWith(input)
    })
})