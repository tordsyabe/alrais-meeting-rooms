import React, { createContext, useState, useEffect } from "react";
import { getRooms } from "../services/RoomService";

export const RoomsContext = createContext();

export default function RoomsContextProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return getRooms().onSnapshot((snapShot) => {
      const newRooms = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      setRooms(newRooms);
      console.log(newRooms);
    });
  }, []);

  const values = { rooms, loading };
  return (
    <RoomsContext.Provider value={values}>{children}</RoomsContext.Provider>
  );
}
