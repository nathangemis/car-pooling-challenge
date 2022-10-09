import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../exception/http-exception";

export function errorHandlerMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpException) {
        return res.status(err.status).send(err.message)
    }
    next(err)
}