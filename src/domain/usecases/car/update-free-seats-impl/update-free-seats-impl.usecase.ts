import { CarDto } from "../../../../adapters/dto/car/car.dto";
import { ICarRepository } from "../../../base/repositories/car.repository";
import { IUseCase } from "../../../base/usecase";

export class UpdateFreeSeatsUsecaseImpl implements IUseCase<CarDto | null>{
    carRepository: ICarRepository;
    constructor(carRepository: ICarRepository) {
        this.carRepository = carRepository
    }
    async execute(car: CarDto): Promise<CarDto | null> {
        return await this.carRepository.updateCar(car).then(res => new CarDto(car))
    }
}