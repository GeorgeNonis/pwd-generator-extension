import "../../App.css";
import { PasswordGeneratorFormProps } from "./interfaces";
import { usePasswordGenerator } from "./usePasswordGenerator";
import { getStrengthFillCount } from "../../lib/password";

const PasswordGeneratorForm = ({
  onGeneratePassword,
}: PasswordGeneratorFormProps) => {
  const { handlers, values } = usePasswordGenerator({ onGeneratePassword });

  const filledBars = getStrengthFillCount(
    values.passwordLength,
    values.generatedPassword.length
  );

  const passwordStrengthIndicator = Array.from(
    { length: values.passwordLength },
    (_, index) => (
      <div
        key={index}
        className={`strength-bar ${index < filledBars ? "filled" : ""}`}
        aria-hidden="true"
      />
    )
  );

  return (
    <form
      className="password-generator-form"
      onSubmit={handlers.handleGeneratePassword}
    >
      <div className="form-section">
        <div className="form-group length-group">
          <div className="length-header">
            <label htmlFor="passwordLength">Length</label>
            <span className="length-value">{values.passwordLength}</span>
          </div>
          <input
            type="range"
            id="passwordLength"
            className="length-slider"
            value={values.passwordLength}
            onChange={(e) =>
              handlers.setPasswordLength(Number(e.target.value))
            }
            min={4}
            max={32}
            step={1}
          />
        </div>

        <fieldset className="options-fieldset">
          <legend>Character sets</legend>
          <label className="option-row">
            <input
              type="checkbox"
              checked={values.includeUppercase}
              onChange={(e) => handlers.setIncludeUppercase(e.target.checked)}
            />
            Uppercase (A–Z)
          </label>
          <label className="option-row">
            <input
              type="checkbox"
              checked={values.includeLowercase}
              onChange={(e) => handlers.setIncludeLowercase(e.target.checked)}
            />
            Lowercase (a–z)
          </label>
          <label className="option-row">
            <input
              type="checkbox"
              checked={values.includeNumbers}
              onChange={(e) => handlers.setIncludeNumbers(e.target.checked)}
            />
            Numbers (0–9)
          </label>
          <label className="option-row">
            <input
              type="checkbox"
              checked={values.includeSpecialCharacters}
              onChange={(e) =>
                handlers.setIncludeSpecialCharacters(e.target.checked)
              }
            />
            Symbols (!@#$…)
          </label>
          <label className="option-row">
            <input
              type="checkbox"
              checked={values.showPasswordStrength}
              onChange={(e) =>
                handlers.setShowPasswordStrength(e.target.checked)
              }
            />
            Show strength indicator
          </label>
        </fieldset>

        {values.showPasswordStrength && (
          <div className="strength-section" aria-label="Password strength">
            <div className="strength-bars">{passwordStrengthIndicator}</div>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Generate password
      </button>

      {values.generatedPassword && (
        <div className="generated-password">
          <input
            type="text"
            className="password-output"
            value={values.generatedPassword}
            readOnly
            aria-label="Generated password"
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlers.handleCopyPassword}
          >
            Copy
          </button>
          {values.copyNotification && (
            <div className="notification" role="status">
              Copied to clipboard
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default PasswordGeneratorForm;
