import { IWaitingListRepository } from "../../../base/repositories/waiting-list.repository";
import { IUseCase } from "../../../base/usecase";

export class ResetWaitingListDataUsecaseImpl implements IUseCase<boolean>{
    waitingListRepository: IWaitingListRepository;


    constructor(waitingListRepository: IWaitingListRepository){
        this.waitingListRepository = waitingListRepository
    }


    async execute(): Promise<boolean> {
         return await this.waitingListRepository.resetData()
    }







}