import { CarDto } from "../../../../adapters/dto/car/car.dto";
import { GroupDto } from "../../../../adapters/dto/group/group.dto";
import { IJourneyRepository } from "../../../base/repositories/journey.repository";
import { IUseCase } from "../../../base/usecase";

export class StopJourneyUsecaseImpl implements IUseCase<Map<string, CarDto | GroupDto> | null>{
    journeyRepository: IJourneyRepository;


    constructor(journeyRepository: IJourneyRepository){
        this.journeyRepository = journeyRepository
    }


    async execute(id: number): Promise<Map<string, CarDto | GroupDto> | null> {
        return await this.journeyRepository.deleteGroup(id)
    }
}