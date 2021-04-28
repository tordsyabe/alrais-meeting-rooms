import { database } from "../firebase";

export function getMeetings() {
  return database.meetings;
}

export function getMeeting(meetingId) {
  return database.meetings.doc(meetingId).get();
}

export function deleteMeeting(meetingId) {
  return database.meetings.doc(meetingId).delete();
}

export function getForApprovalMeetings() {
  return database.meetings
    .where("isVerified", "==", true)
    .where("isApproved", "==", false)
    .orderBy("meetingDate");
}

export function getApprovedMeetings() {
  return database.meetings
    .where("isVerified", "==", true)
    .where("isApproved", "==", true)
    .where("meetingDateString", "==", new Date().toLocaleDateString())
    .orderBy("startTime");
}

export function getUnverifiedMeetings() {
  return database.meetings
    .where("isVerified", "==", false)
    .where("isApproved", "==", false)
    .orderBy("meetingDate");
}

export function saveMeeting(meeting) {
  if (meeting.isVerified === true) {
    meeting.isApproved = true;
  }
  console.log(meeting);

  if (meeting.id) {
    return database.meetings.doc(meeting.id).update(meeting);
  }

  return database.meetings.add(meeting);
}

export function cancelMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "CANCELLED",
  });
}

export function undoCancelledMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "BOOKED",
  });
}

export function startMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "ON_GOING",
  });
}

export function stopMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "FINISHED",
  });
}

export function pauseMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "PAUSED",
  });
}

export function verifyStatus(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "VERIFIED",
  });
}

export function updateDuration(meetingId) {
  return database.meetings.doc(meetingId);
}

export function verifyMeeting(meetingId) {
  return database.meetings
    .doc(meetingId)
    .update({
      isVerified: true,
    })
    .then(() => {
      verifyStatus();
    });
}

export function approveMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    isApproved: true,
  });
}
