import { NextFunction, Request,Response } from "express";
import { CarDataSource } from "../../../data/in-memory/car.datasource";
import { JourneyDataSource } from "../../../data/in-memory/journey.datasource";
import { WaitingListDataSource } from "../../../data/in-memory/waiting-list.datasource";

export function logMiddleware(carDataSource: CarDataSource,waitingListDataSource: WaitingListDataSource,journeyDataSource: JourneyDataSource) {
    return (req: Request,res: Response, next: NextFunction) => {
        
        res.on("finish", () => {
            console.info("Car Data", carDataSource.cars)
            console.info("Journey Data", journeyDataSource.journey)
            console.info("WaitingList Data",waitingListDataSource.waitingList)
        })
   
        next()
    }

    
}