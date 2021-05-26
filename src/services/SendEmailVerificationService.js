import { secondsToLocalTime, secondsToLongDate } from "../utils/dateFormatter";

export function sendEmailVerification(data) {
  data.date = secondsToLongDate(data.meetingDate.seconds);
 
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  };
  fetch("http://192.168.10.15/send-verification-email", requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
