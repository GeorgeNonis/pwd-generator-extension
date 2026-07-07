import { PasswordOptions } from "./password";

export type PresetId = "banking" | "wifi" | "pin";

export interface PasswordPreset {
  id: PresetId;
  label: string;
  options: Omit<PasswordOptions, "excludeAmbiguous">;
}

export const PASSWORD_PRESETS: PasswordPreset[] = [
  {
    id: "banking",
    label: "Banking",
    options: {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSpecialCharacters: true,
    },
  },
  {
    id: "wifi",
    label: "WiFi",
    options: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSpecialCharacters: false,
    },
  },
  {
    id: "pin",
    label: "PIN",
    options: {
      length: 6,
      includeUppercase: false,
      includeLowercase: false,
      includeNumbers: true,
      includeSpecialCharacters: false,
    },
  },
];

export function getPresetById(id: PresetId): PasswordPreset {
  const preset = PASSWORD_PRESETS.find((item) => item.id === id);
  if (!preset) {
    throw new Error(`Unknown preset: ${id}`);
  }
  return preset;
}
