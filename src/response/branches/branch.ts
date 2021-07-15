import {BranchType} from "./branchType";

export interface Branch {
  name: string
  url: string
  fullUrl: string
  type: BranchType
}
