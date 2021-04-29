export function sendEmailVerification(data) {
  console.log(data);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  };
  fetch("http://192.168.10.15/send-verification-email", requestOptions, {mode: 'no-cors'})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
