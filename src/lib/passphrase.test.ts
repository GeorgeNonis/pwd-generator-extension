import { generatePassphrase, getPassphraseStrengthFillCount } from "./passphrase";
import { WORD_LIST } from "./wordlist";

describe("passphrase generation (PASS)", () => {
  it("PASS-01: generates passphrase of requested word count", () => {
    const passphrase = generatePassphrase({ wordCount: 4 }, () => 0);
    expect(passphrase.split("-")).toHaveLength(4);
  });

  it("PASS-02: uses only words from bundled word list", () => {
    const passphrase = generatePassphrase({ wordCount: 6 }, (max) => 0);
    passphrase.split("-").forEach((word) => {
      expect(WORD_LIST).toContain(word);
    });
  });

  it("PASS-03: returns empty string when word count below 1", () => {
    expect(generatePassphrase({ wordCount: 0 })).toBe("");
  });

  it("PASS-04: supports custom separator", () => {
    expect(generatePassphrase({ wordCount: 2, separator: " " }, () => 0)).toBe(
      `${WORD_LIST[0]} ${WORD_LIST[0]}`
    );
  });

  it("PASS strength fill count caps at word count", () => {
    expect(getPassphraseStrengthFillCount(6, 4)).toBe(4);
    expect(getPassphraseStrengthFillCount(4, 6)).toBe(4);
  });
});
