import { PasswordsProps } from "../interfaces";
import Pwd from "./pwd/pwd";

const Passwords = ({ values, handlers }: PasswordsProps) => {
  return (
    <div className="passwords">
      {values.pwds.map((pwd) => {
        return (
          <Pwd
            onCheckPwd={handlers.onCheckPwd}
            selectState={values.selectState}
            pwd={pwd}
          />
        );
      })}
    </div>
  );
};
export default Passwords;
