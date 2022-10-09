import { CarDto } from "../../../../adapters/dto/car/car.dto";
import { ICarRepository } from "../../../base/repositories/car.repository";
import { IUseCase } from "../../../base/usecase";

export class GetCarByFreeSeatUsecaseImpl implements IUseCase<CarDto | null>{
   
    carRepository : ICarRepository
    constructor(carRepository : ICarRepository){
        this.carRepository = carRepository
    }

    async execute(seats: number): Promise<CarDto | null> {
        return await this.carRepository.getCarByFreeSeat(seats).then(res => {
            if(res){
                return new CarDto(res)
            }
            return null
        })
    }
}