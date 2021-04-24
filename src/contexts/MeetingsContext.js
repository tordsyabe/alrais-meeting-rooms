import { ContactSupportOutlined } from "@material-ui/icons";
import React, { createContext, useState, useEffect } from "react";
import {
  getApprovedMeetings,
  getForApprovalMeetings,
  getMeetings,
  getMeetingsByDate,
} from "../services/MeetingService";
import { getRooms } from "../services/RoomService";
import firebase from "../firebase";

export const MeetingsContext = createContext();

export default function MeetingsContextProvider({ children }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState({
    title: "FREE",
  });

  const [forApprovals, setForApprovals] = useState([]);

  useEffect(() => {
    return getMeetings().onSnapshot((snapShot) => {
      const newMeetings = [];

      snapShot.docs.forEach((meeting) => {
        newMeetings.push({ id: meeting.id, ...meeting.data() });
      });

      setLoading(false);
      setMeetings(newMeetings);
    });
  }, []);

  useEffect(() => {
    getForApprovalMeetings().onSnapshot((snapShot) => {
      const newForApproval = [];

      snapShot.docs.forEach((meeting) => {
        newForApproval.push({ id: meeting.id, ...meeting.data() });
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
  };
  return (
    <MeetingsContext.Provider value={values}>
      {children}
    </MeetingsContext.Provider>
  );
}
