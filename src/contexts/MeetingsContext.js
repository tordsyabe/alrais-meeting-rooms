import React, { createContext, useState, useEffect } from "react";
import {
  getApprovedMeetings,
  getMeetings,
  getUnverifiedMeetings,
} from "../services/MeetingService";

export const MeetingsContext = createContext();

export default function MeetingsContextProvider({ children }) {
  const [allMeetings, setAllMeetings] = useState([]);
  const [approvedMeetings, setApprovedMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState({
    title: "FREE",
  });

  const [unverifiedMeetings, setUnverifiedMeetings] = useState([]);

  useEffect(() => {
    return getMeetings().onSnapshot((snapShot) => {
      const newAllMeetings = [];

      snapShot.docs.forEach((meeting) => {
        console.log(meeting.id);
        newAllMeetings.push({
          id: meeting.id,
          ...meeting.data(),
          date: meeting.data().date.toDate(),
        });
      });

      setLoading(false);
      setAllMeetings(newAllMeetings);
    });
  }, []);

  useEffect(() => {
    return getApprovedMeetings().onSnapshot((snapShot) => {
      const newMeetings = [];

      snapShot.docs.forEach((meeting) => {
        console.log(meeting.id);
        newMeetings.push({
          id: meeting.id,
          ...meeting.data(),
          date: meeting.data().date.toDate(),
        });
      });

      setLoading(false);
      setApprovedMeetings(newMeetings);
    });
  }, []);

  useEffect(() => {
    return getUnverifiedMeetings().onSnapshot((snapShot) => {
      const newUnverified = [];

      snapShot.docs.forEach((meeting) => {
        newUnverified.push({
          id: meeting.id,
          ...meeting.data(),
          date: meeting.data().date.toDate(),
        });
      });

      setLoading(false);
      setUnverifiedMeetings(newUnverified);
      console.log(newUnverified);
    });
  }, []);

  const values = {
    approvedMeetings,
    loading,
    selectedMeeting,
    setSelectedMeeting,
    unverifiedMeetings,
    allMeetings,
  };
  return (
    <MeetingsContext.Provider value={values}>
      {children}
    </MeetingsContext.Provider>
  );
}
