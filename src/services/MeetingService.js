import { database } from "../firebase";

export function getMeetings() {
  return database.meetings.orderBy("date");
}

export function getMeeting(meetingId) {
  return database.meetings.doc(meetingId).get();
}

export function deleteMeeting(meetingId) {
  return database.meetings.doc(meetingId).delete();
}

export function getApprovedMeetings() {
  return database.meetings.where("isApproved", "==", true).orderBy("date");
}

export function getUnverifiedMeetings() {
  return database.meetings.where("isApproved", "==", false).orderBy("date");
}

export function getTodaysMeetings() {
  return database.meetings
    .where("isApproved", "==", true)
    .where("meetingDate", "==", new Date().toISOString().split("T")[0])
    .orderBy("date");
}

export function getMeetingByDate(date) {
  return database.meetings
    .where("isApproved", "==", true)
    .where("meetingDate", "==", date.toISOString().split("T")[0])
    .orderBy("date")
    .get();
}

export function saveMeeting(meeting) {
  if (meeting.isApproved === true) {
    meeting.status = "APPROVED";
  }

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

export function rejectMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "REJECTED",
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

export function approveStatus(meetingId) {
  return database.meetings.doc(meetingId).update({
    status: "APPROVED",
  });
}

export function updateDuration(meetingId) {
  return database.meetings.doc(meetingId);
}

export function verifyMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    isApproved: true,
  });
}

export function approveMeeting(meetingId) {
  return database.meetings.doc(meetingId).update({
    isApproved: true,
  });
}
