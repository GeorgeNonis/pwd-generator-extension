import { getPresetById, PASSWORD_PRESETS } from "./presets";

describe("password presets (PRESET)", () => {
  it("PRESET-01: banking preset uses length 16 and all character sets", () => {
    const preset = getPresetById("banking");
    expect(preset.options.length).toBe(16);
    expect(preset.options.includeUppercase).toBe(true);
    expect(preset.options.includeLowercase).toBe(true);
    expect(preset.options.includeNumbers).toBe(true);
    expect(preset.options.includeSpecialCharacters).toBe(true);
  });

  it("PRESET-02: wifi preset uses length 12 and alphanumeric sets", () => {
    const preset = getPresetById("wifi");
    expect(preset.options.length).toBe(12);
    expect(preset.options.includeUppercase).toBe(true);
    expect(preset.options.includeLowercase).toBe(true);
    expect(preset.options.includeNumbers).toBe(true);
    expect(preset.options.includeSpecialCharacters).toBe(false);
  });

  it("PRESET-03: pin preset uses length 6 and numbers only", () => {
    const preset = getPresetById("pin");
    expect(preset.options.length).toBe(6);
    expect(preset.options.includeUppercase).toBe(false);
    expect(preset.options.includeLowercase).toBe(false);
    expect(preset.options.includeNumbers).toBe(true);
    expect(preset.options.includeSpecialCharacters).toBe(false);
  });

  it("PRESET-04: exposes all three presets", () => {
    expect(PASSWORD_PRESETS.map((preset) => preset.id)).toEqual([
      "banking",
      "wifi",
      "pin",
    ]);
  });
});
