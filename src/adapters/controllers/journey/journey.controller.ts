import express, { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../domain/base/usecase";
import { GetCarByFreeSeatUsecaseImpl } from "../../../domain/usecases/car/get-car-by-free-seat-impl/get-car-by-free-seat-impl.usecase";
import { UpdateFreeSeatsUsecaseImpl } from "../../../domain/usecases/car/update-free-seats-impl/update-free-seats-impl.usecase";
import { FindGroupInJourneyUsecaseImpl } from "../../../domain/usecases/journey/find-group-in-journey-impl/find-group-in-journey-impl.usecase";
import { StartJourneyUsecaseImpl } from "../../../domain/usecases/journey/start-journey-impl/start-journey-impl.usecase";
import { AddGroupToWaitingListUsecaseImpl } from "../../../domain/usecases/waiting-list/add-group-to-waitinglist-impl/add-group-to-waitinglist-impl.usecase";
import { HttpCode } from "../../../utils/enums/http-code.enum";
import { HttpException } from "../../../utils/exception/http-exception";
import { dataValidationMiddleware } from "../../../utils/middlewares/data-validation/data-validation.middleware";
import { headerValidationMiddleware } from "../../../utils/middlewares/header-validation/header-validation.middleware";
import { GroupDto } from "../../dto/group/group.dto";

export default function JourneyController(
    startJourneyUsecaseImpl: StartJourneyUsecaseImpl,
    getCarByFreeSeatUsecaseImpl: GetCarByFreeSeatUsecaseImpl,
    updateFreeSeatsUsecaseImpl: UpdateFreeSeatsUsecaseImpl,
    addGroupToWaitingListUsecaseImpl: AddGroupToWaitingListUsecaseImpl,
    findGroupInJourneyUsecaseImpl: FindGroupInJourneyUsecaseImpl
) {
    const router = express.Router()



    router.post("/", [
        headerValidationMiddleware("Content-type", "application/json"),
        dataValidationMiddleware("object", GroupDto)], async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data: GroupDto = req.body
                const group = await findGroupInJourneyUsecaseImpl.execute(data.id)
                if (group) {
                    throw new HttpException("Bad Request", HttpCode.BAD_REQUEST)
                }
                const disponibleCar = await getCarByFreeSeatUsecaseImpl.execute(data.people)
                if (disponibleCar) {
                    disponibleCar.freeSeats = disponibleCar.freeSeats - data.people
                    await startJourneyUsecaseImpl.execute([data], disponibleCar)
                    await updateFreeSeatsUsecaseImpl.execute(disponibleCar)
                } else {
                    await addGroupToWaitingListUsecaseImpl.execute(data)
                }
                res.status(HttpCode.OK).send()
            } catch (err) {
                next(err)
            }
        })

    router.all("/", (req, res, next) => {
        res.status(405).send('Method not allowed');
    })


    return router
}