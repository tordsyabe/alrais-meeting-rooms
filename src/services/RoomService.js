import {database} from "../firebase"

export function getRooms() {
    return database.rooms;
}