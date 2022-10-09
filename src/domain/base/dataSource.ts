
export abstract class DataSource<T>  {
    abstract create(data: T): Promise<T>
    abstract createMany(data: T[]): Promise<void | T[]>
    abstract joinOneToMany(refs: T[], model: any) : Promise<boolean>
    abstract getById(id: number): Promise<T | null>
    abstract getOne(data: Partial<T>): Promise<T | null>
    abstract delete(id: number): Promise<any>
    abstract update(data: T): Promise<T | null>
    abstract reset() : Promise<boolean>
}