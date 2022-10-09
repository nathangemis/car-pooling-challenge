import express, { Request, Response } from "express";
import { GetCarByIdUsecaseImpl } from "../../../domain/usecases/car/get-car-by-id-impl/get-car-by-id.usecase";
import { UpdateFreeSeatsUsecaseImpl } from "../../../domain/usecases/car/update-free-seats-impl/update-free-seats-impl.usecase";
import { StartJourneyUsecaseImpl } from "../../../domain/usecases/journey/start-journey-impl/start-journey-impl.usecase";
import { StopJourneyUsecaseImpl } from "../../../domain/usecases/journey/stop-journey-impl/stop-journey-impl.usecase";
import { DeleteGroupFromWaitingListUsecaseImpl } from "../../../domain/usecases/waiting-list/delete-group-from-waitinglist-impl/delete-group-from-waitinglist-impl.usecase";
import { SearchGroupByPeopleUsecaseImpl } from "../../../domain/usecases/waiting-list/search-group-by-people-impl/search-group-by-people-impl.usecase";
import { HttpCode } from "../../../utils/enums/http-code.enum";
import { dataValidationMiddleware } from "../../../utils/middlewares/data-validation/data-validation.middleware";
import { headerValidationMiddleware } from "../../../utils/middlewares/header-validation/header-validation.middleware";
import { DropOffRequestDto } from "../../dto/dropoff/dropOffRequest.dto";
import { GroupDto } from "../../dto/group/group.dto";

export default function DropOffController(
    stopJourneyUsecaseImpl: StopJourneyUsecaseImpl,
    startJourneyUsecaseImpl: StartJourneyUsecaseImpl,
    deleteGroupFromWaitingListUsecaseImpl: DeleteGroupFromWaitingListUsecaseImpl,
    searchGroupByPeopleUsecaseImpl: SearchGroupByPeopleUsecaseImpl,
    getCarByIdUsecaseImpl: GetCarByIdUsecaseImpl,
    updateFreeSeatsUsecaseImpl: UpdateFreeSeatsUsecaseImpl,
) {
    const router = express.Router()


    router.post("/", [
        headerValidationMiddleware("Content-type", "application/x-www-form-urlencoded"),
        dataValidationMiddleware("object", DropOffRequestDto)], async (req: Request, res: Response) => {
            const groupsToCompleteCar = async (freeSeats: number, groups: GroupDto[] = []): Promise<GroupDto[]> => {
                if (freeSeats === 0) {
                    return groups
                }
                const group = await searchGroupByPeopleUsecaseImpl.execute(freeSeats)
                if (group) {
                    freeSeats = freeSeats - group.people
                    groups.push(group)
                    await deleteGroupFromWaitingListUsecaseImpl.execute(group.id)
                    return groupsToCompleteCar(freeSeats, groups)
                }
                return groups

            }
            const { ID }: DropOffRequestDto = req.body
            const deletedGroupFromJourney = await stopJourneyUsecaseImpl.execute(ID)
            if (!deletedGroupFromJourney) {
                const deletedGroupFromWaitingList = await deleteGroupFromWaitingListUsecaseImpl.execute(ID)
                if (deletedGroupFromWaitingList) {
                    return res.status(HttpCode.OK).send()
                }
                return res.status(HttpCode.NOT_FOUND).send()
            }

            res.on("finish", async () => {
                const carId = deletedGroupFromJourney.get("car")!.id
                const group = deletedGroupFromJourney.get("group") as GroupDto
                const people = group.people
                const car = await getCarByIdUsecaseImpl.execute(carId)
                const freeSeats = car!.freeSeats + people
                const availableGroups = await groupsToCompleteCar(freeSeats)
                await startJourneyUsecaseImpl.execute(availableGroups, car!)
                car!.freeSeats = car!.freeSeats + people - (availableGroups.reduce((prev, curr) => prev + curr.people, 0))
                await updateFreeSeatsUsecaseImpl.execute(car!)
            })
            res.status(HttpCode.OK).send()

        })

    router.all("/", (req, res, next) => {
        res.status(405).send('Method not allowed');
    })


    return router
}