export function canModifyAssessment(createdAt?: Date) {
  if (!createdAt) {
    return false;
  }
  const diffInMilliseconds = new Date().getTime() - createdAt.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return diffInDays < 2;
}
