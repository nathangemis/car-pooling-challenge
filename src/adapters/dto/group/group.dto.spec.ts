// @ts-nocheck
/**
 * 
 * @group unit
 * 
 */

import { GroupDto } from "./group.dto"


describe("Group Dto", () => {

    test("GroupDTo should throw invalid input data", () => {
        let groupDto = () => new GroupDto({ id: "1", people: "7" })
        expect(groupDto).toThrow(Error)
    })

    test("GroupDTo should validate input data", () => {
        let groupDto = () => new GroupDto({ id: 1, people: 5 })
        expect(groupDto).not.toThrow(Error)
    })
})