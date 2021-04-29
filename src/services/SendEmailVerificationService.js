export function sendEmailVerification(data) {
  data.startTime = new Date(data.startTime.seconds * 1000).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  data.endTime = new Date(data.endTime.seconds * 1000).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  data.meetingDate = new Date(
    data.meetingDate.seconds * 1000
  ).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(data);
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
