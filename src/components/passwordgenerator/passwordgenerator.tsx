import "../../App.css";
import { PasswordGeneratorFormProps } from "./interfaces";
import { usePasswordGenerator } from "./usePasswordGenerator";
import { PASSWORD_PRESETS } from "../../lib/presets";

const PasswordGeneratorForm = ({
  onGeneratePassword,
}: PasswordGeneratorFormProps) => {
  const { handlers, values } = usePasswordGenerator({ onGeneratePassword });

  const passwordStrengthIndicator = Array.from(
    { length: values.strengthTarget },
    (_, index) => (
      <div
        key={index}
        className={`strength-bar ${index < values.filledBars ? "filled" : ""}`}
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
        <div className="mode-toggle" role="group" aria-label="Generation mode">
          <button
            type="button"
            className={`mode-btn ${
              values.generationMode === "password" ? "active" : ""
            }`}
            onClick={() => handlers.setGenerationMode("password")}
          >
            Password
          </button>
          <button
            type="button"
            className={`mode-btn ${
              values.generationMode === "passphrase" ? "active" : ""
            }`}
            onClick={() => handlers.setGenerationMode("passphrase")}
          >
            Passphrase
          </button>
        </div>

        {values.generationMode === "password" && (
          <div className="preset-row" role="group" aria-label="Password presets">
            {PASSWORD_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`preset-btn ${
                  values.activePreset === preset.id ? "active" : ""
                }`}
                onClick={() => handlers.applyPreset(preset.id)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}

        {values.generationMode === "password" ? (
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
        ) : (
          <div className="form-group length-group">
            <div className="length-header">
              <label htmlFor="wordCount">Words</label>
              <span className="length-value">{values.wordCount}</span>
            </div>
            <input
              type="range"
              id="wordCount"
              className="length-slider"
              value={values.wordCount}
              onChange={(e) => handlers.setWordCount(Number(e.target.value))}
              min={4}
              max={8}
              step={1}
            />
          </div>
        )}

        {values.generationMode === "password" && (
          <fieldset className="options-fieldset">
            <legend>Character sets</legend>
            <label className="option-row">
              <input
                type="checkbox"
                checked={values.includeUppercase}
                onChange={(e) =>
                  handlers.setIncludeUppercase(e.target.checked)
                }
              />
              Uppercase (A–Z)
            </label>
            <label className="option-row">
              <input
                type="checkbox"
                checked={values.includeLowercase}
                onChange={(e) =>
                  handlers.setIncludeLowercase(e.target.checked)
                }
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
        )}

        {values.generationMode === "passphrase" && (
          <label className="option-row passphrase-option">
            <input
              type="checkbox"
              checked={values.showPasswordStrength}
              onChange={(e) =>
                handlers.setShowPasswordStrength(e.target.checked)
              }
            />
            Show strength indicator
          </label>
        )}

        {values.showPasswordStrength && (
          <div className="strength-section" aria-label="Password strength">
            <div className="strength-bars">{passwordStrengthIndicator}</div>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {values.generationMode === "passphrase"
          ? "Generate passphrase"
          : "Generate password"}
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
