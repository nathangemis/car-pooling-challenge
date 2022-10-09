import { CarDto } from "../../../../adapters/dto/car/car.dto";
import { CreateCarDto } from "../../../../adapters/dto/car/create-car.dto";
import { ICarRepository } from "../../../base/repositories/car.repository";
import { IUseCase } from "../../../base/usecase";

export class PutCarsUsecaseImpl implements IUseCase<boolean> {
    carRepository : ICarRepository

    constructor(repository : ICarRepository){
        this.carRepository = repository
    }

    execute(cars: CreateCarDto[]): Promise<boolean> {
        return this.carRepository.putCars(cars)
    }
}