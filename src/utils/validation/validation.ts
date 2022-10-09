import { HttpCode } from "../enums/http-code.enum"
import { HttpException } from "../exception/http-exception"

export default class Validation {

    static isNumber = (arg: Record<string, any>, parse: boolean = false) => {
        const k = Object.keys(arg)[0]

        let value = arg[k]

        if (parse && !isNaN(value)) {
            value = parseInt(value)
        }
        if (typeof value !== "number") {
            throw new HttpException(`${k} should be a number`, HttpCode.BAD_REQUEST)
        }
        return value
    }

    static isString = (arg: Record<string, any>) => {
        const k = Object.keys(arg)[0]
        if (typeof arg[k] !== "string") {
            throw new HttpException(`${k} should be a string`, HttpCode.BAD_REQUEST)
        }
        return arg[k]
    }
    static isArray = (arg: any) => {
        if (!Array.isArray(arg)) {
            throw new HttpException("data should be an array", HttpCode.BAD_REQUEST)
        }
    }

    static isObject = (arg: any) => {
        if (typeof arg !== 'object' || Array.isArray(arg) || arg === null) {
            throw new HttpException("data should be an object", HttpCode.BAD_REQUEST)
        }
    }

    static max = (arg: Record<string, any>, val: number, parse: boolean = false) => {
        const k = Object.keys(arg)[0]
        let value = arg[k]


        value = this.isNumber(arg)

        if(value > val){
            throw new HttpException(`${k} should be lower or equal than ${val}`, HttpCode.BAD_REQUEST)
        }

        return value

    }

    static min = (arg: Record<string, any>, val: number, parse: boolean = false) => {
        const k = Object.keys(arg)[0]
        let value = arg[k]


        value = this.isNumber(arg)

        if(value < val){
            throw new HttpException(`${k} should be greater or equal than ${val}`, HttpCode.BAD_REQUEST)
        }

        return value

    }

}