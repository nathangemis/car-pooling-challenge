/**
 * 
 * @group unit
 * 
 */

import { Request, Response, NextFunction } from "express";
import { HttpException } from "../../exception/http-exception";
import { errorHandlerMiddleware } from "./error-handler.middleware";



describe("ErrorHandler Middleware", () => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNextFunction: NextFunction = jest.fn();


    beforeAll(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    })



    test("should return error response if throw HttpException", () => {
        let error = new HttpException("Bad Request", 500)

        errorHandlerMiddleware(error, mockRequest as Request, mockResponse as Response, mockNextFunction)
        expect(mockResponse.status).toBeCalledWith(500)
        expect(mockResponse.send).toBeCalledWith(error.message)
        expect(mockNextFunction).not.toHaveBeenCalled();
    })

    test("should call next() and error response if throw another Error", () => {
        let error = new Error("Bad Request")
        errorHandlerMiddleware(error, mockRequest as Request, mockResponse as Response, mockNextFunction)
        expect(mockResponse.status).toBeCalledWith(500)
        expect(mockResponse.send).toBeCalledWith(error.message)
        expect(mockNextFunction).toHaveBeenCalledTimes(1);
    })
})