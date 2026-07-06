import {
  buildCharacterSet,
  generatePassword,
  getStrengthFillCount,
} from "./password";

describe("password generation (GEN)", () => {
  const baseOptions = {
    length: 8,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialCharacters: false,
  };

  it("GEN-01: builds character set from enabled toggles", () => {
    expect(buildCharacterSet(baseOptions)).toMatch(/[A-Z]/);
    expect(buildCharacterSet(baseOptions)).toMatch(/[a-z]/);
    expect(buildCharacterSet(baseOptions)).toMatch(/[0-9]/);
    expect(buildCharacterSet(baseOptions)).not.toMatch(/!/);
  });

  it("GEN-02: generates password of requested length", () => {
    const password = generatePassword(
      { ...baseOptions, length: 12 },
      () => 0
    );
    expect(password).toHaveLength(12);
  });

  it("GEN-03: returns empty string when no character set selected", () => {
    expect(
      generatePassword({
        length: 10,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSpecialCharacters: false,
      })
    ).toBe("");
  });

  it("GEN-04: uses only characters from enabled sets", () => {
    let i = 0;
    const password = generatePassword(
      {
        length: 20,
        includeUppercase: true,
        includeLowercase: false,
        includeNumbers: false,
        includeSpecialCharacters: false,
      },
      (max) => i++ % max
    );

    expect(password).toMatch(/^[A-Z]+$/);
  });

  it("GEN-05: strength fill count caps at password length", () => {
    expect(getStrengthFillCount(12, 8)).toBe(8);
    expect(getStrengthFillCount(8, 12)).toBe(8);
  });

  it("GEN-06: excludes ambiguous characters when enabled", () => {
    const charSet = buildCharacterSet({
      ...baseOptions,
      includeSpecialCharacters: true,
      excludeAmbiguous: true,
    });

    expect(charSet).not.toMatch(/[0Oo1lIi]/);

    const password = generatePassword(
      {
        length: 40,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSpecialCharacters: false,
        excludeAmbiguous: true,
      },
      (max) => (max > 0 ? 0 : 0)
    );

    expect(password).not.toMatch(/[0Oo1lIi]/);
  });
});
