import { DataSource } from "../../../domain/base/dataSource";
import { IJourneyRepository } from "../../../domain/base/repositories/journey.repository";
import { CarEntity } from "../../../domain/entities/car.entity";
import { GroupEntity } from "../../../domain/entities/group.entity";
import { CarDto } from "../../dto/car/car.dto";
import { CreateCarDto } from "../../dto/car/create-car.dto";
import { GroupDto } from "../../dto/group/group.dto";

export class JourneyRepositoryImpl implements IJourneyRepository {

    journeyDataSource : DataSource<any>
    constructor(journeyDataSource: DataSource<any>){
        this.journeyDataSource = journeyDataSource
    }
   


    async joinManyGroupWithCar(group: GroupDto[], car: CreateCarDto): Promise<boolean> {
        return await this.journeyDataSource.joinOneToMany(group,car)
    }
    async deleteGroup(id: number): Promise<Map<string, GroupDto | CarDto> | null> {
        return await this.journeyDataSource.delete(id)
    }

    async findGroupById(id: number): Promise<Map<string, GroupDto | CarDto> | null> {
        return await this.journeyDataSource.getById(id)
    }
    async resetData(): Promise<boolean> {
        return await this.journeyDataSource.reset()
    }
}