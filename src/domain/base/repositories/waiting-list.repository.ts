import { GroupDto } from "../../../adapters/dto/group/group.dto"
import { GroupEntity } from "../../entities/group.entity"

export interface IWaitingListRepository {
    addGroup(group : GroupDto) : Promise<GroupEntity>
    deleteGroup(id : number) : Promise<boolean>
    getFirstGroupByPeople(people : number) : Promise<GroupEntity | null>
    findGroupById(id : number) : Promise<GroupEntity | null>
    resetData() : Promise<boolean>
}