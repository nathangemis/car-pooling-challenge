import { DataSource } from "../../domain/base/dataSource";
import { GroupEntity } from "../../domain/entities/group.entity"

export class WaitingListDataSource implements DataSource<GroupEntity>{

    waitingList!: Map<number, Map<number, GroupEntity>>


    constructor() {
        this.waitingList = new Map()
    }




    create(data: GroupEntity): Promise<GroupEntity> {
        const entity = new GroupEntity(data)
        return new Promise((resolve, _) => {
            const collection = this.waitingList.get(entity.people)

            if (!collection) {
                const group = new Map()
                group.set(entity.id, entity)
                this.waitingList.set(entity.people, group)
                return resolve(entity)
            }
            collection.set(entity.id, entity)
            return resolve(entity)
        })
    }


    createMany(data: GroupEntity[]): Promise<void | GroupEntity[]> {
        throw new Error("Method not implemented.");
    }
    joinOneToMany(refs: GroupEntity[], model: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<GroupEntity | null> {
        return new Promise((resolve,_) => {
            // const waitingList = this.waitingList
            for (const [key,value] of this.waitingList) {
                const group = value.get(id)
                if(group){
                    return resolve(group)
                }
            }
            return resolve(null)
        })
  
    }
    getOne(data: Partial<GroupEntity>): Promise<GroupEntity | null> {

        const people = data.people as number

        return new Promise((resolve,_) => {
            const waitingList = this.waitingList
            const groups = []

            for (const [key,value] of waitingList) {
                if(key <= people){
                    const group = waitingList.get(key)
                    if(group && group.size){
                        const [old] = group.values()
                        groups.push(old)
                    }
                }
            }
            if(groups.length > 1){
                const result = groups.reduce((r, o) => o.addedAt < r.addedAt ? o : r);
                return resolve(result)
            }else if(groups.length !== 0 && groups.length === 1){
                return resolve(groups[0])
            }
            return resolve(null)
        })
    }
    delete(id: number): Promise<boolean> {
        return new Promise((resolve,_) => {
            const waitingList = this.waitingList
            for (const [key,value] of waitingList) {
                const del = value.delete(id)
                if(del){
                    return resolve(del)
                }
            }
            return resolve(false)
        })

    }
    update(data: GroupEntity): Promise<GroupEntity | null> {
        throw new Error("Method not implemented.");
    }
    async reset(): Promise<boolean> {
        this.waitingList.clear()
        return true
    }
}