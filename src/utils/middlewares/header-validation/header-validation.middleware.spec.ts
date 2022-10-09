/**
 * 
 * @group unit
 * 
 */



import { NextFunction, Request, Response } from "express"
import { HttpCode } from "../../enums/http-code.enum"
import { HttpException } from "../../exception/http-exception"
import { headerValidationMiddleware } from "./header-validation.middleware"


describe("Header Validation Middleware", () => {

    let mockResponse: Partial<Response>
    let mockNextFunction: NextFunction = jest.fn()
    let mockRequest = (headers: any) => ({
        headers,
        get(name: string) {
            return headers[name]
        }
    })

    test("should return HttpException if request header is different", () => {
 
        const req = mockRequest({
            "content-type": "text/html"
        })
        const validation = () => headerValidationMiddleware("content-type", "application/json")(req as Request, mockResponse as Response, mockNextFunction)
        expect(validation).toThrow(HttpException)
    })
    test("should call next() if header is valid", () => {
        const req = mockRequest({
            "content-type" : "application/json"
        })
        headerValidationMiddleware("content-type", "application/json")(req as Request, mockResponse as Response, mockNextFunction)
        expect(mockNextFunction).toBeCalledTimes(1)
    })
})