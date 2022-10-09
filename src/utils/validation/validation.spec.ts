// @ts-nocheck 

/**
 * 
 * @group unit
 * 
 */

import Validation from "./validation"


describe("Validation util", () => {

    let data: any

    test("should isNumber throw when is not a number", () => {
        data = "hello"
        const result = () => Validation.isNumber({ data })
        expect(result).toThrow(Error)
    })

    test("should isNumber not throw when is a number", () => {
        data = 7
        const result = () => Validation.isNumber({ data })
        expect(result).not.toThrow()
    })


    test("should isString throw when is not a string", () => {
        data = 7
        const result = () => Validation.isString({ data })
        expect(result).toThrow(Error)
    })

    test("should isString not throw when is a string", () => {
        data = "hello"
        const result = () => Validation.isString({ data })
        expect(result).not.toThrow()
    })

    test("should isArray throw when is not an array", () => {
        data = {id : 5}
        const result = () => Validation.isArray(data)
        expect(result).toThrow(Error)
    })

    test("should isArray not throw when is an array", () => {
        data = [{id: 5, other: "heellooo"}]
        const result = () => Validation.isArray(data)
        expect(result).not.toThrow()
    })

    test("should isObject throw when is not a JS object", () => {
        data = [{id : 5}]
        const result = () => Validation.isObject(data)
        expect(result).toThrow(Error)
    })

    test("should isObject not throw when is a JS object", () => {
        data = {id: 5, other: "heellooo"}
        const result = () => Validation.isObject(data)
        expect(result).not.toThrow()
    })

    test("should min not throw when data is greater or equal than value ", () => {
        data = {seats : 5}
        const result = () => Validation.min(data,1)
        expect(result).not.toThrow()
    })

    test("should min throw when data is lower than value ", () => {
        data = {seats : 1}
        const result = () => Validation.min(data,2)
        expect(result).toThrow()
    })

    test("should max not throw when data is lower or equal than value ", () => {
        data = {seats : 5}
        const result = () => Validation.max(data,6)
        expect(result).not.toThrow()
    })

    test("should max throw when data is greater than value ", () => {
        data = {seats : 4}
        const result = () => Validation.max(data,2)
        expect(result).toThrow()
    })

})