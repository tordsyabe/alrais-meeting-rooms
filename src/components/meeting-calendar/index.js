import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function MeetingCalendar() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />;
}
