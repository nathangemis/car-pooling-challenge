import { CarDto } from "../../adapters/dto/car/car.dto";
import { GroupEntity } from "../../domain/entities/group.entity";
import { WaitingListDataSource } from "../in-memory/waiting-list.datasource";

export class WaitingListDataSourceMock extends WaitingListDataSource {

    constructor() {
        super()
        this.fillData()

    }


    private mockGroupEntity(id: number)  {
        return {
            id,
            people: Math.floor(Math.random() * 6) + 1,
            addedAt: new Date(2022, 0, id)
        } 
    }

    private fillData() {
        for (let index = 1; index < 10; index++) {
            this.create(this.mockGroupEntity(index))
        }
    }
}