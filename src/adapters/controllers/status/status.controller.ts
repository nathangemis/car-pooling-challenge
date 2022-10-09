import express from "express";
import { Request, Response } from "express";
import { HttpCode } from "../../../utils/enums/http-code.enum";

export default function StatusController() {
    const router = express.Router()


    router.get("/", (req: Request, res: Response) => {
        res.status(HttpCode.OK).send()
    })

    router.all("/", (req, res, next) => {
        res.status(405).send('Method not allowed');
    })


    return router
}