import nock from "nock";
import {Api, School} from "../src";
import {Branch} from "../src/response/branches/branch";
import {Timetable} from "../src/response/timetable/timetable";

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
            nock("https://api.vulder.xyz")
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
                    "name": "AS",
                    "url": "/plany/n1.html",
                    "fullUrl": "https://vulder.xyz/plany/n1.html",
                    "type": 1
                }
            ]
            nock("https://api.vulder.xyz")
                .persist()
                .get("/school/branch/Current?url=https://api.vulder.xyz/plany")
                .reply(200, expectedResponse);

            const response = await new Api().getBranches("https://api.vulder.xyz/plany")
            expect<Array<Branch>>(response).toStrictEqual(expectedResponse);
        })
    })
    describe("Api.getTimetable()", () => {
        it('Should return Timetable object', async () => {
            const expectedResponse = {
                timetableItems: [
                    {
                        "subject": [
                            "Matematyka"
                        ],
                        "dayOfWeek": 0,
                        "lessonNumber": 9,
                        "startAt": "2021-07-16T00:00:00",
                        "endAt": "2021-07-16T00:00:00",
                        "teacher": [
                            {
                                "initials": "AS",
                                "href": "n1.html"
                            }
                        ],
                        "classroom": [
                            {
                                "classroomNumber": "1",
                                "href": "s1.html"
                            }
                        ]
                    }
                ]
            }
            nock("https://api.vulder.xyz")
                .persist()
                .get("/school/timetable/Current?url=https://api.vulder.xyz/plany/o1.html")
                .reply(200, expectedResponse);
            const response = await new Api().getTimetable("https://api.vulder.xyz/plany/o1.html")
            expect<Timetable>(response).toStrictEqual(expectedResponse);
        });
    })
})