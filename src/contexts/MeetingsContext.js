import React, { createContext, useState, useEffect } from "react";
import {
  getApprovedMeetings,
  getForApprovalMeetings,
  getMeetings,
  getUnverifiedMeetings,
} from "../services/MeetingService";

export const MeetingsContext = createContext();

export default function MeetingsContextProvider({ children }) {
  const [allMeetings, setAllMeetings] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState({
    title: "FREE",
  });

  const [forApprovals, setForApprovals] = useState([]);
  const [unverified, setUnverified] = useState([]);

  useEffect(() => {
    return getMeetings().onSnapshot((snapShot) => {
      const newAllMeetings = [];

      snapShot.docs.forEach((meeting) => {
        console.log(meeting.id);
        newAllMeetings.push({
          id: meeting.id,
          ...meeting.data(),
          startTime: meeting.data().startTime.toDate(),
          endTime: meeting.data().endTime.toDate(),
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
          startTime: meeting.data().startTime.toDate(),
          endTime: meeting.data().endTime.toDate(),
        });
      });

      setLoading(false);
      setMeetings(newMeetings);
      console.log(newMeetings);
    });
  }, []);

  useEffect(() => {
    return getUnverifiedMeetings().onSnapshot((snapShot) => {
      const newUnverified = [];

      snapShot.docs.forEach((meeting) => {
        newUnverified.push({
          id: meeting.id,
          ...meeting.data(),
          startTime: meeting.data().startTime.toDate(),
          endTime: meeting.data().endTime.toDate(),
        });
      });

      setLoading(false);
      setUnverified(newUnverified);
      console.log(newUnverified);
    });
  }, []);

  useEffect(() => {
    getForApprovalMeetings().onSnapshot((snapShot) => {
      const newForApproval = [];

      snapShot.docs.forEach((meeting) => {
        newForApproval.push({
          id: meeting.id,
          ...meeting.data(),
          startTime: meeting.data().startTime.toDate(),
          endTime: meeting.data().endTime.toDate(),
        });
      });

      setLoading(false);
      setForApprovals(newForApproval);
    });
  }, []);

  const values = {
    meetings,
    loading,
    selectedMeeting,
    setSelectedMeeting,
    forApprovals,
    unverified,
    allMeetings,
  };
  return (
    <MeetingsContext.Provider value={values}>
      {children}
    </MeetingsContext.Provider>
  );
}
