import React, { useContext } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { getForApprovalMeetings } from "../../services/MeetingService";

export default function Approvals() {
  const { forApprovals } = useContext(MeetingsContext);

  console.log(forApprovals);

  return (
    <div>
      {forApprovals.map((approval) => (
        <div key={approval.id}>{approval.title}</div>
      ))}
    </div>
  );
}
