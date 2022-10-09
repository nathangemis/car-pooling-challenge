import express, { Request, Response } from "express";
import { FindGroupInJourneyUsecaseImpl } from "../../../domain/usecases/journey/find-group-in-journey-impl/find-group-in-journey-impl.usecase";
import { FindGroupInWaitingListUsecaseImpl } from "../../../domain/usecases/waiting-list/find-group-in-waitinglist-impl/find-group-in-waitinglist-impl.usecase";
import { HttpCode } from "../../../utils/enums/http-code.enum";
import { dataValidationMiddleware } from "../../../utils/middlewares/data-validation/data-validation.middleware";
import { headerValidationMiddleware } from "../../../utils/middlewares/header-validation/header-validation.middleware";
import { CarDto } from "../../dto/car/car.dto";
import { CarResponseDto } from "../../dto/car/CarResponse.dto";
import { LocateRequestDto } from "../../dto/locate/locateRequest.dto";


export default function LocateController(findGroupInJourneyUsecaseImpl: FindGroupInJourneyUsecaseImpl, findGroupInWaitingListUsecaseImpl: FindGroupInWaitingListUsecaseImpl) {
    const router = express.Router()


    router.post("/", [headerValidationMiddleware("Content-type", "application/x-www-form-urlencoded"),
    // headerValidationMiddleware("Accept", "application/json"),
    dataValidationMiddleware("object", LocateRequestDto)
    ], async (req: Request, res: Response) => {
        const { ID }: LocateRequestDto = req.body
        const isInJourney = await findGroupInJourneyUsecaseImpl.execute(ID)
        if (!isInJourney) {
            const isInWaitingList = await findGroupInWaitingListUsecaseImpl.execute(ID)
            if (isInWaitingList) {
                return res.status(HttpCode.NO_CONTENT).send()
            }
            return res.status(HttpCode.NOT_FOUND).send()
        }
        const car = new CarResponseDto(isInJourney.get("car") as CarDto)
        return res.status(HttpCode.OK).send(car)
    })


    router.all("/", (req, res, next) => {
        res.status(405).send('Method not allowed');
    })


    return router
}