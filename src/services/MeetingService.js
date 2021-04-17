import { database } from "../firebase";

export function getMeetings() {
  return database.meetings;
}

export function saveMeeting(meeting) {
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

export function updateDuration(meetingId) {
  return database.meetings.doc(meetingId);
}