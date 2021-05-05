import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { verifyMeeting } from "../../services/MeetingService";

export default function Verify() {
  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  // const email = queryParams.get("email");
  const id = queryParams.get("meeting_id");

  useEffect(() => {
    verifyMeeting(id).then(() => history.push("/book"));
  }, []);
  return <div>Verifying...</div>;
}
