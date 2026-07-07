import { WORD_LIST } from "./wordlist";

export interface PassphraseOptions {
  wordCount: number;
  separator?: string;
}

export function generatePassphrase(
  options: PassphraseOptions,
  randomIndex: (max: number) => number = (max) =>
    crypto.getRandomValues(new Uint32Array(1))[0] % max
): string {
  const { wordCount, separator = "-" } = options;

  if (wordCount < 1) {
    return "";
  }

  const words: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    words.push(WORD_LIST[randomIndex(WORD_LIST.length)]);
  }

  return words.join(separator);
}

export function getPassphraseStrengthFillCount(
  wordCount: number,
  generatedWordCount: number
): number {
  return Math.min(generatedWordCount, wordCount);
}
