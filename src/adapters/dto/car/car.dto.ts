import { ICarInput } from "../../../domain/entities/car.entity"




export class CarDto {
    id! : number
    seats!: number
    freeSeats: number
    constructor({id,seats, freeSeats} : ICarInput){
        this.id = id
        this.seats = seats
        this.freeSeats = freeSeats !==undefined ? freeSeats : seats
    }
}