// @ts-nocheck
/**
 * 
 * @group unit
 * 
 */


import { CreateCarDto } from "./create-car.dto"




describe("Create Car Dto", () => {

    test("CarDTo should throw invalid input data", () => {
        let carDto = () => new CreateCarDto({id: "1",seats : "30" })
        expect(carDto).toThrow(Error)
    })

    test("CarDTo should validate input data", () => {
        let carDto = () => new CreateCarDto({id: 1,seats : 5 })
        expect(carDto).not.toThrow(Error)
    })




})