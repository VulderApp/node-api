import nock from "nock";
import {Api, School} from "../src";
import {Branch} from "../src/response/branches/branch";

describe('Vulder API test', () => {
    describe("Api.getSearchedItems(\"Warszawa\")", () => {
        it("Should return array of School", async () => {
            const expectedResponse = {
                schools: [
                    {
                        id: "4123122",
                        name: "ZSP1 w Warszawie",
                        url: "https://vulder.xyz"
                    }
                ]
            };
            const scope = nock("https://api.vulder.xyz")
                .persist()
                .get("/search/find?input=Warszawie")
                .reply(200, expectedResponse);

            const response = await new Api().getSearchedItems("Warszawie")
            expect<Array<School>>(response).toStrictEqual(expectedResponse.schools);
        });
    })
    describe("Api.getBranches()", () => {
        it("Should return an array of Branch", async () => {
            const expectedResponse = [
                {
                    "name": "1A",
                    "url": "/plany/o1.html",
                    "fullUrl": "https://vulder.xyz/plany/o1.html",
                    "type": 0
                },
                {
                    "name": "1B",
                    "url": "/plany/n1.html",
                    "fullUrl": "https://vulder.xyz/plany/n1.html",
                    "type": 1
                }
            ]
            const scope = nock("https://api.vulder.xyz")
                .persist()
                .get("/school/branch/Current?url=https://api.vulder.xyz/plany")
                .reply(200, expectedResponse);

            const response = await new Api().getBranches("https://api.vulder.xyz/plany")
            expect<Array<Branch>>(response).toStrictEqual(expectedResponse);
        })
    })
})