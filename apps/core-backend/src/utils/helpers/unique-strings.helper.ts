export function uniqueStrings(arr: string[]): string[] {
  const uniqueSet = new Set<string>(arr); // Use a Set to automatically remove duplicates
  return Array.from(uniqueSet); // Convert the Set back to an array
}
