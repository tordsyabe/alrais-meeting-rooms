export function secondsToLocalTime(seconds) {
  return new Date(seconds * 1000).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function secondsToLongDate(seconds) {
  return new Date(seconds * 1000).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function todayToLongDate() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function dateToLongDate(date) {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function dateToLocalTime(date) {
  return new Date(date).toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return hours;
};
