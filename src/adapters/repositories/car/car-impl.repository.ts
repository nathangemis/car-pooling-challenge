import { DataSource } from "../../../domain/base/dataSource";
import { ICarRepository } from "../../../domain/base/repositories/car.repository";
import { CarEntity } from "../../../domain/entities/car.entity";
import { CarDto } from "../../dto/car/car.dto";
import { CreateCarDto } from "../../dto/car/create-car.dto";

export class CarRepositoryImpl implements ICarRepository {

    dataSource: DataSource<CarEntity>
    constructor(dataSource: DataSource<CarEntity>) {
        this.dataSource = dataSource
    }


    async putCars(cars: CreateCarDto[]): Promise<boolean> {
        return await this.dataSource.createMany(cars as CarEntity[]).then(_ => true)

    }
    async getCarById(id: number): Promise<CarEntity | null> {
        return await this.dataSource.getOne({ id })
    }
    async getCarByFreeSeat(nmb: number): Promise<CarEntity | null> {
        return await this.dataSource.getOne({ freeSeats: nmb })
    }

    async updateCar(carDto: CarDto): Promise<CarEntity | null> {
        return await this.dataSource.update(carDto)
    }

    async resetData(): Promise<boolean> {
        return await this.dataSource.reset()
    }

}