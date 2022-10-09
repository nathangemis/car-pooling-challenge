/**
 * 
 * 
 * @group unit
 * 
 * 
 */

import server from "../../../server"
import StatusController from "./status.controller"
import request from "supertest"


describe("Status Controller", () => {
    beforeAll(()=> {
        server.use("/status",StatusController())
    })
    test("Get /status should return 200", async () => {
        const response =  await request(server).get("/status")
        expect(response.statusCode).toBe(200)
    })
})  