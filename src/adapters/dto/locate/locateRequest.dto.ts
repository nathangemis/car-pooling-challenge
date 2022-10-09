import Validation from "../../../utils/validation/validation"

interface LocateInput {
    ID: number
}






export class LocateRequestDto {
    ID!: number
    constructor({ ID }: LocateInput) {
        this.ID = Validation.isNumber({ ID }, true)
    }
}