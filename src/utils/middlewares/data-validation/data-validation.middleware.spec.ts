/**
 * 
 * @group unit
 * 
 */


import { NextFunction, Request, Response } from "express"
import Validation from "../../validation/validation"
import { dataValidationMiddleware } from "./data-validation.middleware"


describe("DataValidation Middleware", () => {

    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    const mockNextFunction: NextFunction = jest.fn()

    class MockDto {
        id: number;
        constructor({id} : Record<any,any>){
            Validation.isNumber({id})
            this.id = id
        }
    }

    beforeEach(() => {
        mockResponse = {
            json: jest.fn()
        }
    })



    test("should throw error if data is different as expected", () => {
        mockRequest = {
            body: {id : "test" }
        }

        const result = () => dataValidationMiddleware("object", MockDto)(mockRequest as Request, mockResponse as Response, mockNextFunction)

        expect(result).toThrow(Error)

    })

    test("should call next if data is the same type as expected", () => {
        mockRequest = {
            body: {id : 5 }
        }

       dataValidationMiddleware("object", MockDto)(mockRequest as Request, mockResponse as Response, mockNextFunction)

        expect(mockNextFunction).toBeCalledTimes(1)

    })




})