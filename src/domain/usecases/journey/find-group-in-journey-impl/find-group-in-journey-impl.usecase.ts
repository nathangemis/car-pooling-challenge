import { CarDto } from "../../../../adapters/dto/car/car.dto";
import { CarResponseDto } from "../../../../adapters/dto/car/CarResponse.dto";
import { GroupDto } from "../../../../adapters/dto/group/group.dto";
import { IJourneyRepository } from "../../../base/repositories/journey.repository";
import { IUseCase } from "../../../base/usecase";

export class FindGroupInJourneyUsecaseImpl implements IUseCase<Map<string, CarDto | GroupDto> | null>{
    journeyRepository : IJourneyRepository

    constructor(journeyRepository : IJourneyRepository){
        this.journeyRepository = journeyRepository
    }   

    async execute(id: number): Promise<Map<string, CarDto | GroupDto> | null> {
        return await this.journeyRepository.findGroupById(id)
    }

}