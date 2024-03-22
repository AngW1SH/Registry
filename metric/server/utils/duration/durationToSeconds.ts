import { Duration } from './types';

export const durationToSeconds = (duration: Duration): number => {
  let result = duration.number;
  switch (duration.unitOfTime) {
    case 'months':
      result *= 30;
    case 'weeks':
      result *= 7;
    case 'days':
      result *= 24;
    case 'hours':
      result *= 60;
    case 'minutes':
      result *= 60;
    case 'seconds':
      break;
  }

  return result;
};
