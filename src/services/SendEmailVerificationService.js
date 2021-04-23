export function sendEmailVerification(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  };
  fetch("http://127.0.0.1:5000/send-verification-email", requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
