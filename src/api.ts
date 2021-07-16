import axios from "axios";
import { School } from "./response/search/school";
import { Search } from "./response/search/search";
import { Branch } from "./response/branches/branch";
import { Timetable } from "./response/timetable/timetable";

export class Api {
  url: string;

  constructor(url: string = "https://api.vulder.xyz") {
    this.url = url;
  }

  async getSearchedItems(keywords: string): Promise<Array<School>> {
    return await axios
      .request<Search>({
        method: "get",
        url: "/search/find",
        baseURL: this.url,
        params: {
          input: keywords,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          return res.data.schools;
        }

        return Array<School>();
      });
  }

  async getBranches(url: string): Promise<Array<Branch>> {
    return await axios
      .request<Array<Branch>>({
        method: "get",
        url: "/school/branch/Current",
        baseURL: this.url,
        params: {
          url: url,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }

        return new Array<Branch>();
      });
  }

  async getTimetable(url: string): Promise<Timetable> {
    return await axios
      .request<Timetable>({
        method: "get",
        url: "/school/timetable/Current",
        baseURL: this.url,
        params: {
          url: url,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }

        return {} as Timetable;
      });
  }
}
