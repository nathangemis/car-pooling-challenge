import { IWaitingListRepository } from "../../../base/repositories/waiting-list.repository";
import { IUseCase } from "../../../base/usecase";

export class DeleteGroupFromWaitingListUsecaseImpl implements IUseCase<boolean>{

    waitingListRepository : IWaitingListRepository


    constructor(waitingListRepository: IWaitingListRepository){
        this.waitingListRepository = waitingListRepository
    }


    async execute(id: number): Promise<boolean> {
        return await this.waitingListRepository.deleteGroup(id)
    }

}