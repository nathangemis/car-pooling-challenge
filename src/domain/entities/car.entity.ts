import { CarDto } from "../../adapters/dto/car/car.dto"
import { CreateCarDto } from "../../adapters/dto/car/create-car.dto"
import { Entity } from "../base/entity"


export interface ICarInput {
    id: number
    seats: number
    freeSeats? : number

}



export class CarEntity extends Entity {
    seats!: number
    freeSeats!: number

    constructor(input : ICarInput){
        super(input)
        this.freeSeats = input.freeSeats !== undefined ? input.freeSeats : input.seats
        
    }
}