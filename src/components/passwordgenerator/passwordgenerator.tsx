import "../../App.css";
import { usePasswordGenerator } from "./usePasswordGenerator";

interface PasswordGeneratorFormProps {
  onGeneratePassword: (password: string) => void;
}

const PasswordGeneratorForm = ({
  onGeneratePassword,
}: PasswordGeneratorFormProps) => {
  const { handlers, values } = usePasswordGenerator({ onGeneratePassword });
  const passwordStrengthIndicator = Array.from(
    { length: values.passwordLength },
    (_, index) => (
      <div
        key={index}
        className={`password-strength-indicator-bar ${
          values.generatedPassword.length > index ? "filled" : ""
        }`}
      ></div>
    )
  );

  return (
    <>
      <form
        className="password-generator-form"
        onSubmit={handlers.handleGeneratePassword}
      >
        <div className="form-group">
          <label htmlFor="passwordLength">Password Length:</label>
          <input
            type="number"
            id="passwordLength"
            value={values.passwordLength}
            onChange={(e) => handlers.setPasswordLength(Number(e.target.value))}
            min={1}
            max={20}
            step={1}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={values.includeUppercase}
              onChange={(e) => handlers.setIncludeUppercase(e.target.checked)}
            />
            Include Uppercase Letters
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={values.includeLowercase}
              onChange={(e) => handlers.setIncludeLowercase(e.target.checked)}
            />
            Include Lowercase Letters
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={values.includeNumbers}
              onChange={(e) => handlers.setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={values.includeSpecialCharacters}
              onChange={(e) =>
                handlers.setIncludeSpecialCharacters(e.target.checked)
              }
            />
            Include Special Characters
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={values.showPasswordStrength}
              onChange={(e) =>
                handlers.setShowPasswordStrength(e.target.checked)
              }
            />
            Show Password Strength
          </label>
        </div>
        {values.showPasswordStrength && (
          <div className="form-group">
            <label>Password Strength:</label>
            <div className="password-strength-indicator">
              {passwordStrengthIndicator}
            </div>
          </div>
        )}
        <button type="submit">Generate Password</button>
        {values.generatedPassword && (
          <div className="generated-password">
            <input type="text" value={values.generatedPassword} readOnly />
            <button type="button" onClick={handlers.handleCopyPassword}>
              Copy
            </button>
            {values.copyNotification && (
              <div className="notification">Password copied!</div>
            )}
          </div>
        )}
      </form>
      <h3>{values.generatedPassword ?? undefined}</h3>
    </>
  );
};

export default PasswordGeneratorForm;
