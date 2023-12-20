import moment from "moment";

export function getGrammaticalNumber(
  value: number,
  singular: string,
  plural: string
) {
  return value > 1 ? plural : singular;
}

export function timestampToText(timestamp: number) {
  const date = moment.unix(timestamp);
  const today = moment();

  const daysDiff = today.diff(date, "days");

  if (daysDiff === 0) {
    const hoursDiff = today.diff(date, "hours"),
      minutes = Math.trunc(today.diff(date, "minutes"));

    return hoursDiff
      ? `${Math.trunc(hoursDiff)} ${getGrammaticalNumber(
          hoursDiff,
          "hour",
          "hours"
        )} ago`
      : `${minutes} ${getGrammaticalNumber(minutes, "minute", "minutes")} ago`;
  } else if (daysDiff === 1) return "Yesterday";
  else if (daysDiff < 7) return `${daysDiff} days ago`;
  else if (daysDiff < 32) {
    const weeksDiff = Math.max(today.diff(date, "weeks"), 1);

    return `${weeksDiff} ${getGrammaticalNumber(
      weeksDiff,
      "week",
      "weeks"
    )} ago`;
  } else if (daysDiff < 366) {
    const monthsDiff = today.diff(date, "months");
    return `${monthsDiff} ${getGrammaticalNumber(
      monthsDiff,
      "month",
      "months"
    )} ago`;
  } else {
    const yearsDiff = today.diff(date, "years");
    return `${yearsDiff} ${getGrammaticalNumber(
      yearsDiff,
      "year",
      "years"
    )} ago`;
  }
}
