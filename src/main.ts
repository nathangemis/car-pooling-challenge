import CarController from "./adapters/controllers/car/car.controller"
import DropOffController from "./adapters/controllers/dropoff/dropoff.controller"
import JourneyController from "./adapters/controllers/journey/journey.controller"
import LocateController from "./adapters/controllers/locate/locate.controller"
import StatusController from "./adapters/controllers/status/status.controller"
import { CarRepositoryImpl } from "./adapters/repositories/car/car-impl.repository"
import { JourneyRepositoryImpl } from "./adapters/repositories/journey/journey-impl.repository"
import { WaitingListRepositoryImpl } from "./adapters/repositories/waiting-list/waiting-list-impl.repository"
import { CarDataSource } from "./data/in-memory/car.datasource"
import { JourneyDataSource } from "./data/in-memory/journey.datasource"
import { WaitingListDataSource } from "./data/in-memory/waiting-list.datasource"
import { GetCarByFreeSeatUsecaseImpl } from "./domain/usecases/car/get-car-by-free-seat-impl/get-car-by-free-seat-impl.usecase"
import { GetCarByIdUsecaseImpl } from "./domain/usecases/car/get-car-by-id-impl/get-car-by-id.usecase"
import { PutCarsUsecaseImpl } from "./domain/usecases/car/put-cars-impl/put-cars-impl.usecase"
import { ResetCarsDataUsecaseImpl } from "./domain/usecases/car/reset-cars-data-impl/reset-cars-data-impl.usecase"
import { UpdateFreeSeatsUsecaseImpl } from "./domain/usecases/car/update-free-seats-impl/update-free-seats-impl.usecase"
import { FindGroupInJourneyUsecaseImpl } from "./domain/usecases/journey/find-group-in-journey-impl/find-group-in-journey-impl.usecase"
import { ResetJourneyDataUsecaseImpl } from "./domain/usecases/journey/reset-journey-data-impl/reset-journey-data-impl.usecase"
import { StartJourneyUsecaseImpl } from "./domain/usecases/journey/start-journey-impl/start-journey-impl.usecase"
import { StopJourneyUsecaseImpl } from "./domain/usecases/journey/stop-journey-impl/stop-journey-impl.usecase"
import { AddGroupToWaitingListUsecaseImpl } from "./domain/usecases/waiting-list/add-group-to-waitinglist-impl/add-group-to-waitinglist-impl.usecase"
import { DeleteGroupFromWaitingListUsecaseImpl } from "./domain/usecases/waiting-list/delete-group-from-waitinglist-impl/delete-group-from-waitinglist-impl.usecase"
import { FindGroupInWaitingListUsecaseImpl } from "./domain/usecases/waiting-list/find-group-in-waitinglist-impl/find-group-in-waitinglist-impl.usecase"
import { ResetWaitingListDataUsecaseImpl } from "./domain/usecases/waiting-list/reset-waitinglist-data-impl/reset-waitinglist-data-impl.usecase"
import { SearchGroupByPeopleUsecaseImpl } from "./domain/usecases/waiting-list/search-group-by-people-impl/search-group-by-people-impl.usecase"
import server from "./server"
// import { logMiddleware } from "./utils/middlewares/data-log/data-log.middleware"
import { errorHandlerMiddleware } from "./utils/middlewares/error-handler/error-handler.middleware"

(async () => {
    const carDataSource = new CarDataSource()
    const journeyDataSource = new JourneyDataSource()
    const waitingListDataSource = new WaitingListDataSource()
    const carRepository = new CarRepositoryImpl(carDataSource)
    const journeyRepository = new JourneyRepositoryImpl(journeyDataSource)
    const waitingListRepository = new WaitingListRepositoryImpl(waitingListDataSource)


    const putCarsUsecase = new PutCarsUsecaseImpl(carRepository)
    const getCarByFreeSeatUsecaseImpl = new GetCarByFreeSeatUsecaseImpl(carRepository)
    const updateFreeSeatsUsecaseImpl = new UpdateFreeSeatsUsecaseImpl(carRepository)
    const addGroupToWaitingListUsecaseImpl = new AddGroupToWaitingListUsecaseImpl(waitingListRepository)
    const startJourneyUsecaseImpl = new StartJourneyUsecaseImpl(journeyRepository)
    const stopJourneyUsecaseImpl = new StopJourneyUsecaseImpl(journeyRepository)
    const findGroupInWaitingListUsecaseImpl = new FindGroupInWaitingListUsecaseImpl(waitingListRepository)
    const deleteGroupFromWaitingList = new DeleteGroupFromWaitingListUsecaseImpl(waitingListRepository)
    const findGroupInJourneyUsecaseImpl = new FindGroupInJourneyUsecaseImpl(journeyRepository)
    const searchGroupByPeopleUsecaseImpl = new SearchGroupByPeopleUsecaseImpl(waitingListRepository)
    const getCarByIdUsecaseImpl = new GetCarByIdUsecaseImpl(carRepository)
    const resetCarsDataUsecaseImpl = new ResetCarsDataUsecaseImpl(carRepository)
    const resetWaitingListDataUsecaseImpl = new ResetWaitingListDataUsecaseImpl(waitingListRepository)
    const resetJourneyDataUsecaseImpl = new ResetJourneyDataUsecaseImpl(journeyRepository)

    // server.use(logMiddleware(carDataSource, waitingListDataSource, journeyDataSource))


    server.use("/status", StatusController())
    server.use("/cars", CarController(putCarsUsecase, resetCarsDataUsecaseImpl,resetJourneyDataUsecaseImpl,resetWaitingListDataUsecaseImpl))
    server.use("/journey", JourneyController(
        startJourneyUsecaseImpl,
        getCarByFreeSeatUsecaseImpl,
        updateFreeSeatsUsecaseImpl,
        addGroupToWaitingListUsecaseImpl,
        findGroupInJourneyUsecaseImpl))
    server.use("/locate", LocateController(findGroupInJourneyUsecaseImpl, findGroupInWaitingListUsecaseImpl))
    server.use("/dropoff", DropOffController(
        stopJourneyUsecaseImpl,
        startJourneyUsecaseImpl,
        deleteGroupFromWaitingList,
        searchGroupByPeopleUsecaseImpl,
        getCarByIdUsecaseImpl,
        updateFreeSeatsUsecaseImpl))

    server.use(errorHandlerMiddleware)
    server.listen(9091, () => console.log("Running on http://localhost:9091"))
})()