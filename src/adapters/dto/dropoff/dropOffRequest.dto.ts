import Validation from "../../../utils/validation/validation"

interface DropOffInput {
    ID: number
}

export class DropOffRequestDto {
    ID! : number
    constructor({ID} : DropOffInput){
        this.ID = Validation.isNumber({ ID },true)
    }
}