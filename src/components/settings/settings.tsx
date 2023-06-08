import Checkbox from "./checkbox";
import { useSettings } from "./useSettings";
import Warning from "./warning";

const Settings = () => {
  const { history, onChangeHandler } = useSettings();
  return (
    <div className="settings">
      <Checkbox history={history} onChangeHandler={onChangeHandler} />
      <Warning />
    </div>
  );
};
export default Settings;
