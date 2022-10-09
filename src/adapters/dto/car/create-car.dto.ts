import Validation from "../../../utils/validation/validation"


interface ICreateCarInput {
    id: number
    seats: number
}

export class CreateCarDto {
    id! : number
    seats!: number
    constructor({id,seats} : ICreateCarInput){
        Validation.isNumber({id})
        Validation.min({seats},1)
        Validation.max({seats}, 6)
        this.id = id
        this.seats = seats
    }
}