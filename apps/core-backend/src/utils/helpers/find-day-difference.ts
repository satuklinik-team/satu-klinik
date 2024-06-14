export function dayDifference(from: Date, to: Date) {
  const diffInMilliseconds = to.getTime() - from.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return diffInDays;
}
