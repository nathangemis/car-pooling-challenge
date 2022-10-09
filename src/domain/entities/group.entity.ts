import { GroupDto } from "../../adapters/dto/group/group.dto"

interface GroupEntityInput {
    id: number
    people: number
    addedAt?: Date
}

export class GroupEntity {
    id: number
    people: number
    addedAt: Date


    constructor({ id, people, addedAt  } : GroupEntityInput) {
        this.id = id
        this.people = people
        this.addedAt = addedAt || new Date()
    }
}