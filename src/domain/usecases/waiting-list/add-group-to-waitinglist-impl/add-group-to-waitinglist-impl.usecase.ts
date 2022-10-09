import { GroupDto } from "../../../../adapters/dto/group/group.dto";
import { IWaitingListRepository } from "../../../base/repositories/waiting-list.repository";
import { IUseCase } from "../../../base/usecase";

export class AddGroupToWaitingListUsecaseImpl implements IUseCase<GroupDto>{

    waitingListRepository: IWaitingListRepository
    constructor(waitingListRepository: IWaitingListRepository) {
        this.waitingListRepository = waitingListRepository
    }

    async execute(group: GroupDto): Promise<GroupDto> {
        return await this.waitingListRepository.addGroup(group).then(res => new GroupDto(res))
    }

}