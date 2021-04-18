import { ContactSupportOutlined } from "@material-ui/icons";
import React, { createContext, useState, useEffect } from "react";
import { getMeetings, getMeetingsByDate } from "../services/MeetingService";
import { getRooms } from "../services/RoomService";
import firebase from "../firebase";

export const MeetingsContext = createContext();

export default function MeetingsContextProvider({ children }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState({
    title: "FREE",
  });

  useEffect(() => {
    return getMeetings().orderBy("startDate").onSnapshot((snapShot) => {
      const newMeetings = [];

      snapShot.docs.forEach((meeting) => {
        if(new Date(meeting.data().startDate.seconds * 1000).toLocaleDateString() === new Date(Date.now() - 60 * 60 * 1000).toLocaleDateString()) {
          newMeetings.push({id: meeting.id, ...meeting.data()});

        }
      });

      // const newMeetings = snapShot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      setLoading(false);
      setMeetings(newMeetings);
      // console.log(new Date(newMeetings[0].startDate.seconds * 1000).toLocaleDateString());
      // console.log(new Date(Date.now() - 60 * 60 * 1000).toLocaleDateString())
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
