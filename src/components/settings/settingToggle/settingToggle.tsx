import { SettingToggleProps } from "../interfaces";

const SettingToggle = ({ id, label, checked, onChange }: SettingToggleProps) => {
  return (
    <label htmlFor={id} className="settings-toggle">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default SettingToggle;
