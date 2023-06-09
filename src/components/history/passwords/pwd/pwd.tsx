import { useEffect, useState } from "react";
import { PwdProps } from "../../interfaces";
import { usePwd } from "./usePwd";

const Pwd = ({ ...rest }: PwdProps) => {
  const { pwd, onCheckPwd, selectState } = rest;
  const { checkbox, setCheckbox } = usePwd(selectState);

  return (
    <label htmlFor={pwd} className="pwdlabel">
      {pwd}
      <input
        type="checkbox"
        id={pwd}
        name={pwd}
        checked={checkbox}
        onChange={(e) => {
          setCheckbox(e.target.checked);
          onCheckPwd(pwd, e.target.checked);
        }}
      />
    </label>
  );
};
export default Pwd;
