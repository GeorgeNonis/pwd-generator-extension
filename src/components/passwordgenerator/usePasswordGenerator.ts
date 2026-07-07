import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import {
  generatePassword,
  getStrengthFillCount,
  PasswordOptions,
} from "../../lib/password";
import {
  generatePassphrase,
  getPassphraseStrengthFillCount,
} from "../../lib/passphrase";
import { getPresetById, PresetId } from "../../lib/presets";
import { IRootState } from "../../store/store";

export type GenerationMode = "password" | "passphrase";

interface PasswordGeneratorFormProps {
  onGeneratePassword: (password: string) => void;
}

export const usePasswordGenerator = ({
  onGeneratePassword,
}: PasswordGeneratorFormProps) => {
  const excludeAmbiguous = useSelector(
    (state: IRootState) => state.pwds.excludeAmbiguous
  );
  const [generationMode, setGenerationMode] =
    useState<GenerationMode>("password");
  const [passwordLength, setPasswordLength] = useState(12);
  const [wordCount, setWordCount] = useState(5);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copyNotification, setCopyNotification] = useState(false);
  const [activePreset, setActivePreset] = useState<PresetId | null>(null);

  const getOptions = useCallback(
    (): PasswordOptions => ({
      length: passwordLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialCharacters,
      excludeAmbiguous,
    }),
    [
      passwordLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialCharacters,
      excludeAmbiguous,
    ]
  );

  const runGenerate = useCallback(() => {
    const password =
      generationMode === "passphrase"
        ? generatePassphrase({ wordCount })
        : generatePassword(getOptions());

    setGeneratedPassword(password);
    onGeneratePassword(password);
  }, [generationMode, getOptions, onGeneratePassword, wordCount]);

  const applyPreset = useCallback((presetId: PresetId) => {
    const preset = getPresetById(presetId);
    setGenerationMode("password");
    setActivePreset(presetId);
    setPasswordLength(preset.options.length);
    setIncludeUppercase(preset.options.includeUppercase);
    setIncludeLowercase(preset.options.includeLowercase);
    setIncludeNumbers(preset.options.includeNumbers);
    setIncludeSpecialCharacters(preset.options.includeSpecialCharacters);
  }, []);

  const handleGeneratePassword = (e: FormEvent) => {
    e.preventDefault();
    runGenerate();
  };

  useEffect(() => {
    const listener = (message: { type?: string }) => {
      if (message.type === "REGENERATE_PASSWORD") {
        runGenerate();
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [runGenerate]);

  const handleCopyPassword = async () => {
    if (!generatedPassword) return;

    await navigator.clipboard.writeText(generatedPassword);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2000);
  };

  const strengthTarget =
    generationMode === "passphrase" ? wordCount : passwordLength;

  const generatedStrengthUnits =
    generationMode === "passphrase"
      ? generatedPassword
        ? generatedPassword.split("-").length
        : 0
      : generatedPassword.length;

  const filledBars =
    generationMode === "passphrase"
      ? getPassphraseStrengthFillCount(strengthTarget, generatedStrengthUnits)
      : getStrengthFillCount(strengthTarget, generatedStrengthUnits);

  const values = {
    activePreset,
    copyNotification,
    filledBars,
    generationMode,
    includeLowercase,
    includeNumbers,
    includeSpecialCharacters,
    includeUppercase,
    showPasswordStrength,
    generatedPassword,
    passwordLength,
    strengthTarget,
    wordCount,
  };

  const handlers = {
    applyPreset,
    handleGeneratePassword,
    handleCopyPassword,
    setGenerationMode,
    setIncludeLowercase,
    setIncludeNumbers,
    setIncludeSpecialCharacters,
    setIncludeUppercase,
    setPasswordLength,
    setShowPasswordStrength,
    setWordCount,
  };

  return { values, handlers };
};
