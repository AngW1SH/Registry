import { Duration } from "../types/params";

export const durationToMilliseconds = (duration: Duration) => {
  const multipliers = [1000, 60, 60, 24, 7, 30, 365];

  const multiplyFirst = (index: number) => {
    let result = 1;

    for (let i = 0; i < index; i++) {
      result *= multipliers[i];
    }

    return result;
  };

  switch (duration.unitOfTime) {
    case "seconds":
      return duration.number * multiplyFirst(1);
    case "minutes":
      return duration.number * multiplyFirst(2);
    case "hours":
      return duration.number * multiplyFirst(3);
    case "days":
      return duration.number * multiplyFirst(4);
    case "weeks":
      return duration.number * multiplyFirst(5);
    case "months":
      return duration.number * multiplyFirst(6);
    case "years":
      return duration.number * multiplyFirst(7);
    default:
      return duration.number;
  }
};
