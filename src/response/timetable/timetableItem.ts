import {Week} from "./week";

export interface TimetableItem {
  subject?: Array<string>
  dayOfWeek?: Week,
  lessonNumber?: number
  startAt?: Date,
  endAt?: Date
  teacher?: Array<string>
}
