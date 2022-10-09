import { GroupDto } from "../../../../adapters/dto/group/group.dto";
import { IWaitingListRepository } from "../../../base/repositories/waiting-list.repository";
import { IUseCase } from "../../../base/usecase";

export class SearchGroupByPeopleUsecaseImpl implements IUseCase<GroupDto | null>{

    waitingListRepository: IWaitingListRepository
    constructor(waitingListRepository: IWaitingListRepository) {
        this.waitingListRepository = waitingListRepository
    }


    async execute(nmb: number): Promise<GroupDto | null> {
        return await this.waitingListRepository.getFirstGroupByPeople(nmb).then(res => {
            if(res){
                return new GroupDto(res)
            }
            return null
        })
    }
}