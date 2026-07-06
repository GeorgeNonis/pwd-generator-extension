import { CheckboxProps } from "../interfaces";

const Checkbox = ({ history, onChangeHandler }: CheckboxProps) => {
  return (
    <label htmlFor="settings" className="settings-toggle">
      <input
        type="checkbox"
        name="settings"
        id="settings"
        checked={history}
        onChange={onChangeHandler}
      />
      <span>Remember generated passwords in history</span>
    </label>
  );
};

export default Checkbox;
