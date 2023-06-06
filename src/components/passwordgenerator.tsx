import React, { useEffect, useState } from "react";
import "../App.css";

interface PasswordGeneratorFormProps {
  onGeneratePassword: (password: string) => void;
}

const PasswordGeneratorForm = ({
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

    // Generate password logic
    let password = generatePassword();
    setGeneratedPassword(password);

    // Call the onGeneratePassword callback with the generated password
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

  const passwordStrengthIndicator = Array.from(
    { length: passwordLength },
    (_, index) => (
      <div
        key={index}
        className={`password-strength-indicator-bar ${
          generatedPassword.length > index ? "filled" : ""
        }`}
      ></div>
    )
  );

  const handleCopyPassword = () => {
    chrome.storage.sync.get(["colors"], (result: any) => {
      console.log({ result });
    });
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword)
        .then(() => {
          console.log('Password copied to clipboard');
          // Perform any additional actions after successful copy
        })
        .catch((error) => {
          console.error('Error copying password:', error);
          // Handle error, if any
        });
      setCopyNotification(true);
      setTimeout(() => {
        setCopyNotification(false);
      }, 2000);
    }
    chrome.storage.sync.set({ colors: "changed" }, () => {});
  };

  useEffect(() => {
    chrome.storage.sync.set({ colors: "ss" }, () => {});
  }, []);

  return (
    <form className="password-generator-form" onSubmit={handleGeneratePassword}>
      <div className="form-group">
        <label htmlFor="passwordLength">Password Length:</label>
        <input
          type="number"
          id="passwordLength"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Number(e.target.value))}
          min={1}
          max={20}
          step={1}
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase Letters
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include Lowercase Letters
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={includeSpecialCharacters}
            onChange={(e) => setIncludeSpecialCharacters(e.target.checked)}
          />
          Include Special Characters
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={showPasswordStrength}
            onChange={(e) => setShowPasswordStrength(e.target.checked)}
          />
          Show Password Strength
        </label>
      </div>
      {showPasswordStrength && (
        <div className="form-group">
          <label>Password Strength:</label>
          <div className="password-strength-indicator">
            {passwordStrengthIndicator}
          </div>
        </div>
      )}
      <button type="submit">Generate Password</button>
      {generatedPassword && (
        <div className="generated-password">
          <input type="text" value={generatedPassword} readOnly />
          <button type="button" onClick={handleCopyPassword}>
            Copy
          </button>
          {copyNotification && (
            <div className="notification">Password copied!</div>
          )}
        </div>
      )}
    </form>
  );
};

export default PasswordGeneratorForm;
