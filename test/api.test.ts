import nock from "nock";
import {Api, School} from "../src";

describe('Vulder API test', () => {
    describe("Api.search(\"Warszawa\")", () => {
        it('return array of school', async () => {
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
                .get('/search/find?input=Warszawie')
                .reply(200, expectedResponse);

            const response = await new Api().search("Warszawie")
            expect<Array<School>>(response).toStrictEqual(expectedResponse.schools);
        });
    })
})