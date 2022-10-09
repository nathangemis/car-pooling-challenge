export class Entity {
    id!: number;

    constructor(input: any) {
        Object.assign(this, input)
    }
}