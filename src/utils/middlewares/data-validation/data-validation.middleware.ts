import { NextFunction, Request, Response } from "express";
import Validation from "../../validation/validation";


type DataVaidationType = "array" | "object"

export function dataValidationMiddleware<DTO>(type: DataVaidationType, Dto: { new(...args: any) : DTO }) {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        if (type === "array") {
            Validation.isArray(data)
            req.body = data.map((item : any) => new Dto(item))
        } else {
            Validation.isObject(data)
            req.body = new Dto(data)
        }
        next()
    }
}
