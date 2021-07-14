import axios from "axios";
import {School} from "./response/search/school";
import {Search} from "./response/search/search";

export class Api {
  url: string

  constructor(url: string = "https://api.vulder.xyz") {
    this.url = url;
  }

  async search (keywords: string): Promise<Array<School>>  {
    return await axios.request<Search>({
      method: "get",
      url: `/search/find`,
      baseURL: this.url,
      params: {
        input: keywords,
      },
    }).then((res) => {
      if (res.status == 200) {
        return res.data.schools;
      }

      return Array<School>();
    })
  }
}
