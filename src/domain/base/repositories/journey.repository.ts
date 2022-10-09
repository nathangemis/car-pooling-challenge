import { CarDto } from "../../../adapters/dto/car/car.dto";
import { CreateCarDto } from "../../../adapters/dto/car/create-car.dto";
import { GroupDto } from "../../../adapters/dto/group/group.dto";
import { CarEntity } from "../../entities/car.entity";

export interface IJourneyRepository {
    joinManyGroupWithCar(group : GroupDto[],car: CreateCarDto) : Promise<boolean>
    deleteGroup(id: number) : Promise<Map<string, CarDto | GroupDto> | null>
    findGroupById(id : number) : Promise<Map<string, CarDto | GroupDto> | null>
    resetData() : Promise<boolean>
}