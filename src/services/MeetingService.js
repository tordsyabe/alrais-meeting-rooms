import { database } from "../firebase";

export function getMeetings() {
  return database.meetings;
}
