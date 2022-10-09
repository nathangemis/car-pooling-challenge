import { CarDto } from "../../adapters/dto/car/car.dto";
import { DataSource } from "../../domain/base/dataSource";
import { CarEntity } from "../../domain/entities/car.entity";

export class CarDataSource implements DataSource<CarEntity> {

    cars: Map<number, Map<number, CarEntity>>

    constructor() {
        this.cars = new Map()
    }
    create(data: CarEntity): Promise<CarEntity> {
        return new Promise((resolve, _) => {
            const group = this.cars.get(data.freeSeats)
            if (group) {
                group.set(data.id, data)
                resolve(data)
            }
            const carMap = new Map()
            carMap.set(data.id, data)
            this.cars.set(data.freeSeats, carMap)
            resolve(data)
        })
    }
    createMany(data: CarEntity[]): Promise<void | CarEntity[]> {
        return new Promise((resolve, _) => {
            this.cars = this.generateMap(data)
            resolve()
        })
    }
    joinOneToMany(refs: CarEntity[], model: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<CarEntity | null> {
        throw new Error("Method not implemented.");
    }
    getOne(data: Partial<CarEntity>): Promise<CarEntity | null> {
        return new Promise((resolve, _) => {
            const freeSeats = data.freeSeats
            const id = data.id
            const collection = this.cars
            for (const [key, value] of collection) {
                if (freeSeats && key >= freeSeats) {
                    const cars = this.cars.get(key)
                    if (cars && cars.size > 0) {
                        const [car] = cars?.values()
                        return resolve(car)
                    }
                }
                if (id) {
                    const car = value.get(id)
                    if (car) {
                        return resolve(car)
                    }
                }
            }
            return resolve(null)
        })
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(data: CarEntity): Promise<null | CarEntity> {
        return new Promise((resolve, _) => {
            const cars = this.cars
            for (const [key, value] of cars) {
                const del = value.delete(data.id)
                if (del) {
                    const entity = new CarEntity(data)
                    const getCarMap = this.cars.get(entity.freeSeats)
                    if(getCarMap){
                        getCarMap.set(entity.id, entity)
                    }else{
                        const carMap = new Map()
                        carMap.set(entity.id, entity)
                        this.cars.set(entity.freeSeats, carMap)
                    }
                    return resolve(entity)
                }
            }
            resolve(null)
        })
    }
    async reset(): Promise<boolean> {
        this.cars.clear()
        return true
    }
    generateMap(cars: CarDto[]): Map<number, Map<number, CarEntity>> {
        const groups = new Map();
        const length = cars.length

        for (let index = 0; index < length; index++) {
            let item = cars[index]
            const car = new CarEntity(item)
            const carMap = new Map().set(car.id, car)
            const groupCollection = groups.get(car.freeSeats);
            if (!groupCollection) {
                groups.set(car.freeSeats, carMap);
            } else {
                groupCollection.set(car.id, car);
            }
        }
        return groups;
    }
}