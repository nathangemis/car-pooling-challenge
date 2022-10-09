import { CarDto } from "../../adapters/dto/car/car.dto";
import { CarEntity } from "../../domain/entities/car.entity";
import { CarDataSource } from "../in-memory/car.datasource";

export class CarDataSourceMock extends CarDataSource {

    constructor() {
        super()

        const cars: CarDto[] = new Array(10).fill(null).map((_,index)=> new CarDto({id: index, seats: index + 1 > 5 ? 4 : index + 1 }))
        this.cars = this.generateMap(cars)
    }

}