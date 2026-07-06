import SettingToggle from "./settingToggle/settingToggle";
import { useSettings } from "./useSettings";
import Warning from "./warning";

const Settings = () => {
  const {
    history,
    theme,
    excludeAmbiguous,
    onHistoryChange,
    onThemeChange,
    onExcludeAmbiguousChange,
  } = useSettings();

  return (
    <div className="settings">
      <SettingToggle
        id="settings-history"
        label="Remember generated passwords in history"
        checked={history}
        onChange={onHistoryChange}
      />
      <SettingToggle
        id="settings-ambiguous"
        label="Exclude ambiguous characters (0, O, 1, l, I)"
        checked={excludeAmbiguous}
        onChange={onExcludeAmbiguousChange}
      />
      <SettingToggle
        id="settings-theme"
        label="Light theme"
        checked={theme === "light"}
        onChange={onThemeChange}
      />
      <Warning />
    </div>
  );
};

export default Settings;
