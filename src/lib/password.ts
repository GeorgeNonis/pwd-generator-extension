export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecialCharacters: boolean;
  excludeAmbiguous?: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "!@#$%^&*()_-+=<>?/:";

export const AMBIGUOUS_CHARACTERS = new Set(["0", "O", "o", "1", "l", "I", "i"]);

export function filterAmbiguousCharacters(characterSet: string): string {
  return [...characterSet]
    .filter((char) => !AMBIGUOUS_CHARACTERS.has(char))
    .join("");
}

export function buildCharacterSet(options: PasswordOptions): string {
  let characterSet = "";

  if (options.includeUppercase) characterSet += UPPERCASE;
  if (options.includeLowercase) characterSet += LOWERCASE;
  if (options.includeNumbers) characterSet += NUMBERS;
  if (options.includeSpecialCharacters) characterSet += SPECIAL;

  if (options.excludeAmbiguous) {
    characterSet = filterAmbiguousCharacters(characterSet);
  }

  return characterSet;
}

export function generatePassword(
  options: PasswordOptions,
  randomIndex: (max: number) => number = (max) =>
    crypto.getRandomValues(new Uint32Array(1))[0] % max
): string {
  const characterSet = buildCharacterSet(options);

  if (characterSet.length === 0 || options.length < 1) {
    return "";
  }

  let password = "";

  for (let i = 0; i < options.length; i++) {
    password += characterSet[randomIndex(characterSet.length)];
  }

  return password;
}

export function getStrengthFillCount(
  passwordLength: number,
  generatedLength: number
): number {
  return Math.min(generatedLength, passwordLength);
}
