import { CheckboxProps } from "../interfaces";

const Checkbox = ({ history, onChangeHandler }: CheckboxProps) => {
  return (
    <label htmlFor="settings" className="label">
      Remeber history of passwords
      <input
        type="checkbox"
        name="settings"
        id="settings"
        checked={history}
        onChange={onChangeHandler}
      />
    </label>
  );
};
export default Checkbox;
