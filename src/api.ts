import axios from "axios";
import { School } from "./response/search/school";
import { Search } from "./response/search/search";
import { Branch } from "./response/branches/branch";

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
      })
      .catch((err) => {
        throw new Error(err);
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
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
