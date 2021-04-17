import { ContactSupportOutlined } from "@material-ui/icons";
import React, { createContext, useState, useEffect } from "react";
import { getMeetings, updateDuration } from "../services/MeetingService";
import { getRooms } from "../services/RoomService";

export const MeetingsContext = createContext();

export default function MeetingsContextProvider({ children }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState({
    title: "FREE",
    
  });

  useEffect(() => {
    return getMeetings().onSnapshot((snapShot) => {
      const newMeetings = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);
      setMeetings(newMeetings);
      // setSelectedMeeting(newMeetings[0])
    });
  }, []);

  // useEffect(() => {
  //   setSelectedMeeting(meetings[0]);
  // }, [loading])

  const values = { meetings, loading, selectedMeeting, setSelectedMeeting };
  return (
    <MeetingsContext.Provider value={values}>
      {children}
    </MeetingsContext.Provider>
  );
}
