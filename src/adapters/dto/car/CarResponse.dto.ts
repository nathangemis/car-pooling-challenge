interface ICarResInput {
    id: number
    seats: number
}



export class CarResponseDto {
    id!: number
    seats!: number

    constructor({id,seats} : ICarResInput){
        this.id = id
        this.seats = seats
    }

}