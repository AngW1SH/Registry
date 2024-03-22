export enum UnitOfTime {
  seconds = 'seconds',
  minutes = 'minutes',
  hours = 'hours',
  days = 'days',
  weeks = 'weeks',
  months = 'months',
  years = 'years',
}

export interface Duration {
  number: number;
  unitOfTime: UnitOfTime;
}
