import React, { useEffect, useState } from "react";

interface PasswordGeneratorFormProps {
  onGeneratePassword: (password: string) => void;
}

export const usePasswordGenerator = ({
  onGeneratePassword,
}: PasswordGeneratorFormProps) => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const [copyNotification, setCopyNotification] = useState(false);
  const handleGeneratePassword = (e: React.FormEvent) => {
    e.preventDefault();

    let password = generatePassword();
    setGeneratedPassword(password);

    onGeneratePassword(password);
  };

  const generatePassword = (): string => {
    let characterSet = "";

    if (includeUppercase) {
      characterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (includeLowercase) {
      characterSet += "abcdefghijklmnopqrstuvwxyz";
    }

    if (includeNumbers) {
      characterSet += "0123456789";
    }

    if (includeSpecialCharacters) {
      characterSet += "!@#$%^&*()_-+=<>?/:";
    }

    if (characterSet.length === 0) {
      // Handle case where no character set is selected
      return "";
    }

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      password += characterSet[randomIndex];
    }

    return password;
  };

  const handleCopyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard
        .writeText(generatedPassword)
        .then(() => {})
        .catch((error) => {});
      setCopyNotification(true);
      setTimeout(() => {
        setCopyNotification(false);
      }, 2000);
    }
  };

  const values = {
    copyNotification,
    generatePassword,
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
    setCopyNotification,
    setGeneratedPassword,
    setIncludeLowercase,
    setIncludeNumbers,
    setIncludeSpecialCharacters,
    setIncludeUppercase,
    setPasswordLength,
    setShowPasswordStrength,
  };

  return { values, handlers };
};
