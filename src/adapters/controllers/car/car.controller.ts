import express from "express";
import { Request, Response } from "express";
import { PutCarsUsecaseImpl } from "../../../domain/usecases/car/put-cars-impl/put-cars-impl.usecase";
import { ResetCarsDataUsecaseImpl } from "../../../domain/usecases/car/reset-cars-data-impl/reset-cars-data-impl.usecase";
import { ResetJourneyDataUsecaseImpl } from "../../../domain/usecases/journey/reset-journey-data-impl/reset-journey-data-impl.usecase";
import { ResetWaitingListDataUsecaseImpl } from "../../../domain/usecases/waiting-list/reset-waitinglist-data-impl/reset-waitinglist-data-impl.usecase";
import { HttpCode } from "../../../utils/enums/http-code.enum";
import { dataValidationMiddleware } from "../../../utils/middlewares/data-validation/data-validation.middleware";
import { headerValidationMiddleware } from "../../../utils/middlewares/header-validation/header-validation.middleware";
import { CreateCarDto } from "../../dto/car/create-car.dto";

export default function CarController(
    putCarUsecase: PutCarsUsecaseImpl,
    resetCarsDataUsecaseImpl: ResetCarsDataUsecaseImpl,
    resetJourneyDataUsecaseImpl: ResetJourneyDataUsecaseImpl,
    resetWaitingListDataUsecaseImpl: ResetWaitingListDataUsecaseImpl

) {
    const router = express.Router()

    router.put("/", [headerValidationMiddleware("Content-type", "application/json"), dataValidationMiddleware("array", CreateCarDto)], async (req: Request, res: Response) => {
        const isCarsEmpty = await resetCarsDataUsecaseImpl.execute()
        const isWaitingListEmpty = await resetWaitingListDataUsecaseImpl.execute()
        const isJourneyEmpty = await resetJourneyDataUsecaseImpl.execute()

        if (isCarsEmpty && isWaitingListEmpty && isJourneyEmpty) {
            await putCarUsecase.execute(req.body)
        }
        res.status(HttpCode.OK).send()
    })

    router.all("/", (req, res, next) => {
        res.status(405).send('Method not allowed');
    })

    return router
}