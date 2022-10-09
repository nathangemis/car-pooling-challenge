/**
 * 
 * @group unit
 * 
 */

import { JourneyDataSourceMock } from "../../../data/mocks/journey.datasource.mock"
import { IJourneyRepository } from "../../../domain/base/repositories/journey.repository"
import { CarDto } from "../../dto/car/car.dto"
import { GroupDto } from "../../dto/group/group.dto"
import { JourneyRepositoryImpl } from "./journey-impl.repository"


describe("JourneyRepositoryImpl", () => {

    let journeyRepositoryImpl : IJourneyRepository
    let journeyDataSourceMock : JourneyDataSourceMock
    let car : CarDto
    let groups : GroupDto[]


    beforeEach(() => {
        journeyDataSourceMock = new JourneyDataSourceMock()
        journeyRepositoryImpl = new JourneyRepositoryImpl(journeyDataSourceMock)
        car  = new CarDto({
            id: 1,
            seats: 6
        })
        groups = [{id: 1, people: 4}]
    })
    test("should joinManyGroupWithCar() return true", async () => {
        const groups : GroupDto[] = [{id: 1, people: 4}]
        const result = await journeyRepositoryImpl.joinManyGroupWithCar(groups,car)
        expect(result).toBe(true)
    })
    test("should JourneyDataSourceMock joinOneToMany() be called with right data", async () =>{
        jest.spyOn(journeyDataSourceMock, "joinOneToMany").mockImplementation(() => Promise.resolve(true))
        await journeyRepositoryImpl.joinManyGroupWithCar(groups,car)
        expect(journeyDataSourceMock.joinOneToMany).toHaveBeenCalledWith(groups,car)
    })

    test("should deleteGroup() return Map of car and group if id exist", async () => {
        const result = await journeyRepositoryImpl.deleteGroup(11)
        expect(result).toBeInstanceOf(Map<string, CarDto | GroupDto>)
    })
    test("should deleteGroup() return null id doesn't exist", async () => {
        const result = await journeyRepositoryImpl.deleteGroup(10)
        expect(result).toBe(null)
    })

    test("should JourneyDataSourceMock delete() be called with right data", async () => {
        const input = 4
        jest.spyOn(journeyDataSourceMock, "delete").mockImplementation(() => Promise.resolve(null))
        await journeyRepositoryImpl.deleteGroup(input)
        expect(journeyDataSourceMock.delete).toHaveBeenCalledWith(input)
    })


    test("should resetData return true whan journey data is empty",async  () => {
        const result = await journeyRepositoryImpl.resetData()
        expect(result).toBe(true)
        expect(journeyDataSourceMock.journey.size).toBe(0)
    })

    test("should JourneyDataSource reset() be called",async  () => {
        jest.spyOn(journeyDataSourceMock,"reset").mockImplementation(() => Promise.resolve(true))
        const result = await journeyRepositoryImpl.resetData()
        expect(journeyDataSourceMock.reset).toHaveBeenCalled()
    })
})