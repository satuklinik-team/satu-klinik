export function toKebabCase(inputString: string): string {
  // Replace spaces with underscores
  const stringWithDashes = inputString.replace(/\s+/g, '-');

  // Use regular expression to replace non-alphanumeric characters with hyphens
  const kebabCaseString = stringWithDashes.replace(/[^a-zA-Z0-9\-_]/g, '-');

  // Convert to lowercase
  return kebabCaseString.toLowerCase();
}
