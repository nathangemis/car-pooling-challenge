import { CarDto } from "../../../adapters/dto/car/car.dto"
import { CreateCarDto } from "../../../adapters/dto/car/create-car.dto"
import { CarEntity } from "../../entities/car.entity"

export interface ICarRepository {
    putCars(cars : CreateCarDto[]) : Promise<boolean>
    getCarById(id: number) : Promise<CarEntity | null>
    getCarByFreeSeat(nmb : number) : Promise<CarEntity | null>
    updateCar(carDto : CarDto) : Promise<CarEntity | null>
    resetData() : Promise<boolean>
}