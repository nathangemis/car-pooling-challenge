import { NextFunction, Request, Response } from "express"
import { HttpCode } from "../../enums/http-code.enum"
import { HttpException } from "../../exception/http-exception"

export function headerValidationMiddleware(key: string, value: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.get(key.toLowerCase()) === value) {
      next()
    } else {
      throw new HttpException("Bad Request", HttpCode.BAD_REQUEST)
    }
  }
}