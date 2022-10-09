import { ICarRepository } from "../../../base/repositories/car.repository";
import { IUseCase } from "../../../base/usecase";

export class ResetCarsDataUsecaseImpl implements IUseCase<boolean>{
    carRepository: ICarRepository;


    constructor(carRepository: ICarRepository){
        this.carRepository = carRepository
    }


    async execute(): Promise<boolean> {
         return await this.carRepository.resetData()
    }







}