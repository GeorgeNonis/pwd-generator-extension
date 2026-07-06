import React, { useState } from "react";
import { generatePassword, PasswordOptions } from "../../lib/password";

interface PasswordGeneratorFormProps {
  onGeneratePassword: (password: string) => void;
}

export const usePasswordGenerator = ({
  onGeneratePassword,
}: PasswordGeneratorFormProps) => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copyNotification, setCopyNotification] = useState(false);

  const getOptions = (): PasswordOptions => ({
    length: passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialCharacters,
  });

  const handleGeneratePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const password = generatePassword(getOptions());
    setGeneratedPassword(password);
    onGeneratePassword(password);
  };

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
