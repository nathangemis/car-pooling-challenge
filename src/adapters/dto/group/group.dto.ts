import Validation from "../../../utils/validation/validation"

interface IGroupInput {
    id: number,
    people: number
}



export class GroupDto {
    id!: number
    people!: number
    constructor({ id, people }: IGroupInput) {
        Validation.isNumber({ id })
        Validation.min({ people },1)
        Validation.max({people}, 6)
        this.id = id
        this.people = people
    }
}