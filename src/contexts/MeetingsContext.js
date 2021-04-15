import React, { createContext, useState, useEffect } from "react";
import { getMeetings } from "../services/MeetingService";
import { getRooms } from "../services/RoomService";

export const MeetingsContext = createContext();

export default function MeetingsContextProvider({ children }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return getMeetings().onSnapshot((snapShot) => {
      const newMeetings = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      setMeetings(newMeetings);
    });
  }, []);

  const values = { meetings, loading };
  return (
    <MeetingsContext.Provider value={values}>{children}</MeetingsContext.Provider>
  );
}
