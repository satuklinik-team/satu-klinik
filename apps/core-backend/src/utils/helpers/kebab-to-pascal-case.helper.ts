export function kebabToPascalCase(kebabCaseString: string): string {
  // Split the string into words using the hyphen
  const words = kebabCaseString.split('-');

  // Capitalize the first letter of each word
  const pascalCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  // Join the words back together to form the pascal case string
  const pascalCaseString = pascalCaseWords.join('');

  return pascalCaseString;
}
