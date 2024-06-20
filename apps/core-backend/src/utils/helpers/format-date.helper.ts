import { from } from 'rxjs';

export enum DateOperation {
  Today = 'today',
  Yesterday = 'yesterday',
  SevenDaysAgo = '7DaysAgo',
  TwentyOneDaysAgo = '21DaysAgo',
  ThisMonth = 'thisMonth',
  LastMonth = 'lastMonth',
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export function subtractDays(date: Date, days: number) {
  date.setDate(date.getDate() - days);
  return date;
}

export function thisMonth(date: Date) {
  date.setDate(1);
  return date;
}

export function lastMonth(date: Date) {
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  return date;
}

export function processDateOperation(date: Date, operation: DateOperation) {
  switch (operation) {
    case DateOperation.Today:
      return date;
    case DateOperation.Yesterday:
      return subtractDays(date, 1);
    case DateOperation.SevenDaysAgo:
      return subtractDays(date, 7);
    case DateOperation.TwentyOneDaysAgo:
      return subtractDays(date, 21);
    case DateOperation.ThisMonth:
      return thisMonth(date);
    case DateOperation.LastMonth:
      return lastMonth(date);
  }
}

export function createFromTo(operation?: DateOperation) {
  if (!operation) {
    return {
      from: undefined,
      to: undefined,
    };
  }
  const today = new Date();
  return {
    to: formatDate(today),
    from: formatDate(processDateOperation(today, operation)),
  };
}
