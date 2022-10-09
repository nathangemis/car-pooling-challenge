/**
 * 
 * @group unit
 * 
 */

import { GroupDto } from "../../../../adapters/dto/group/group.dto"
import { WaitingListRepositoryImpl } from "../../../../adapters/repositories/waiting-list/waiting-list-impl.repository"
import { WaitingListDataSourceMock } from "../../../../data/mocks/waiting-list.datasource.mock"
import { IWaitingListRepository } from "../../../base/repositories/waiting-list.repository"
import { IUseCase } from "../../../base/usecase"
import { SearchGroupByPeopleUsecaseImpl } from "./search-group-by-people-impl.usecase"

describe("SearchGroupByPeopleUsecaseImpl", () => {

    let waitingListRepository: IWaitingListRepository
    let searchGroupByPeopleUsecase: IUseCase<GroupDto | null>

    beforeAll(() => {
        const waitingListDataSourceMock = new WaitingListDataSourceMock()
        waitingListRepository = new WaitingListRepositoryImpl(waitingListDataSourceMock)
        searchGroupByPeopleUsecase = new SearchGroupByPeopleUsecaseImpl(waitingListRepository)

    })


    test("should return the oldest inserted group that have less or equal people of a value if exist", async () => {
        const result = await searchGroupByPeopleUsecase.execute(5)
        expect(result).toBeInstanceOf(GroupDto)
    })

    test("should waitingListRepository getFirstGroupByPeople() be called with right data", async () =>{
        const input = 5
        jest.spyOn(waitingListRepository,"getFirstGroupByPeople").mockImplementation(() => Promise.resolve(null))
        await searchGroupByPeopleUsecase.execute(input)

        expect(waitingListRepository.getFirstGroupByPeople).toHaveBeenCalledWith(input)

    })


})