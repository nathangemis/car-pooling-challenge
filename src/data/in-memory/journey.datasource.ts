import { CarDto } from "../../adapters/dto/car/car.dto";
import { GroupDto } from "../../adapters/dto/group/group.dto";
import { DataSource } from "../../domain/base/dataSource";
import { CarEntity } from "../../domain/entities/car.entity";
import { GroupEntity } from "../../domain/entities/group.entity";

export class JourneyDataSource implements DataSource<any>{


    journey!: Map<number, Map<string, CarEntity | GroupEntity>>

    constructor() {
        this.journey = new Map()
    }

    create(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    createMany(data: any[]): Promise<void | any[]> {
        throw new Error("Method not implemented.");
    }
    joinOneToMany(refs: GroupDto[], model: CarDto): Promise<boolean> {
        return new Promise((resolve, _) => {
            for (const group of refs) {
                const join = new Map()
                join.set("group", new GroupEntity(group))
                join.set("car", new CarEntity(model))
                this.journey.set(group.id, join)
            }
            resolve(true)
        })
    }
    getById(id: number): Promise<Map<string, CarEntity | GroupEntity> | null> {
        return new Promise((resolve, _) => {
            const carGroup = this.journey.get(id)
            if(carGroup){
                return resolve(carGroup)
            }
            return resolve(null)
        })
    }
    getOne(data: Partial<any>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Map<string, GroupEntity | CarEntity> | null> {
        return new Promise((resolve, _) => {
            const carGroup = this.journey.get(id)
            if (carGroup) {
                this.journey.delete(id)
                return resolve(carGroup)
            }
            return resolve(null)
        })
    }
    update(data: any): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    async reset(): Promise<boolean> {
        this.journey.clear()
        return true
    }

}