import { IJourneyRepository } from "../../../base/repositories/journey.repository";
import { IUseCase } from "../../../base/usecase";

export class ResetJourneyDataUsecaseImpl implements IUseCase<boolean>{
    journeyRepository: IJourneyRepository;


    constructor(journeyRepository: IJourneyRepository){
        this.journeyRepository = journeyRepository
    }


    async execute(): Promise<boolean> {
         return await this.journeyRepository.resetData()
    }







}