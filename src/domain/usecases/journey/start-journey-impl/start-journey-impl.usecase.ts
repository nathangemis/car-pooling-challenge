import { CarDto } from "../../../../adapters/dto/car/car.dto";
import { CreateCarDto } from "../../../../adapters/dto/car/create-car.dto";
import { GroupDto } from "../../../../adapters/dto/group/group.dto";
import { IJourneyRepository } from "../../../base/repositories/journey.repository";
import { IUseCase } from "../../../base/usecase";

export class StartJourneyUsecaseImpl implements IUseCase<boolean> {

    journeyRepository: IJourneyRepository

    constructor(journeyRepository: IJourneyRepository) {
        this.journeyRepository = journeyRepository
    }

    async execute(groups: GroupDto[], car: CreateCarDto): Promise<boolean> {
        return await this.journeyRepository.joinManyGroupWithCar(groups, car)
    }







}