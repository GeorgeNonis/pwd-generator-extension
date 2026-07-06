import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generatePassword, PasswordOptions } from "../../lib/password";
import { IRootState } from "../../store/store";

interface PasswordGeneratorFormProps {
  onGeneratePassword: (password: string) => void;
}

export const usePasswordGenerator = ({
  onGeneratePassword,
}: PasswordGeneratorFormProps) => {
  const excludeAmbiguous = useSelector(
    (state: IRootState) => state.pwds.excludeAmbiguous
  );
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copyNotification, setCopyNotification] = useState(false);

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
    const password = generatePassword(getOptions());
    setGeneratedPassword(password);
    onGeneratePassword(password);
  }, [getOptions, onGeneratePassword]);

  const handleGeneratePassword = (e: React.FormEvent) => {
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

  const values = {
    copyNotification,
    includeLowercase,
    includeNumbers,
    includeSpecialCharacters,
    includeUppercase,
    showPasswordStrength,
    generatedPassword,
    passwordLength,
  };

  const handlers = {
    handleGeneratePassword,
    handleCopyPassword,
    setIncludeLowercase,
    setIncludeNumbers,
    setIncludeSpecialCharacters,
    setIncludeUppercase,
    setPasswordLength,
    setShowPasswordStrength,
  };

  return { values, handlers };
};
