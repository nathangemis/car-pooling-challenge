import { CarDto } from "../../adapters/dto/car/car.dto";
import { GroupDto } from "../../adapters/dto/group/group.dto";
import { JourneyDataSource } from "../in-memory/journey.datasource";

export class JourneyDataSourceMock extends JourneyDataSource {
    constructor(){
        super()


        const groups : GroupDto[] = [
            {
                id: 11,
                people: 3
            },
            {
                id: 12,
                people: 2
            }
        ]

        const car : CarDto = {
            id: 1,
            seats: 6,
            freeSeats : 6
        }


        this.joinOneToMany(groups,car)
    }
}