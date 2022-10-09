import { WaitingListDataSource } from "../../../data/in-memory/waiting-list.datasource";
import { DataSource } from "../../../domain/base/dataSource";
import { IWaitingListRepository } from "../../../domain/base/repositories/waiting-list.repository";
import { GroupEntity } from "../../../domain/entities/group.entity";
import { GroupDto } from "../../dto/group/group.dto";



export class WaitingListRepositoryImpl implements IWaitingListRepository {

    waitingListDataSource: DataSource<GroupEntity>

    constructor(waitingListDataSource: DataSource<GroupEntity>) {
        this.waitingListDataSource = waitingListDataSource
    }


    async addGroup(group: GroupDto): Promise<GroupEntity> {
        return await this.waitingListDataSource.create(group as GroupEntity)
    }

    async deleteGroup(id: number): Promise<boolean> {
        return await this.waitingListDataSource.delete(id)
    }

    async getFirstGroupByPeople(people: number): Promise<GroupEntity | null> {
        return await this.waitingListDataSource.getOne({people})
    }

    async findGroupById(id: number): Promise<GroupEntity | null> {
        return await this.waitingListDataSource.getById(id)
    }

    async resetData(): Promise<boolean> {
        return await this.waitingListDataSource.reset()
    }


}