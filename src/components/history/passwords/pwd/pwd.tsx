import { PwdProps } from "../../interfaces";

const Pwd = ({ ...rest }: PwdProps) => {
  const { pwd, onCheckPwd } = rest;

  return (
    <label htmlFor={pwd} className="pwdlabel">
      {pwd}
      <input
        type="checkbox"
        id={pwd}
        name={pwd}
        onChange={(e) => {
          onCheckPwd(pwd, e.target.checked);
        }}
      />
    </label>
  );
};
export default Pwd;
