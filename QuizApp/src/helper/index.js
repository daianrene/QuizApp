export const getFormattedTimeFromSeconds = (seconds) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;
