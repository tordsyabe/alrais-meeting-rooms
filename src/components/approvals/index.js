import React, { useContext } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { getForApprovalMeetings } from "../../services/MeetingService";

export default function Approvals() {
  const { forApprovals } = useContext(MeetingsContext);

  return (
    <div>
      {forApprovals.map((approval) => (
        <div>{approval.title}</div>
      ))}
    </div>
  );
}
