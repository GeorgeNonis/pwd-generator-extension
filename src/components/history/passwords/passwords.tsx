import { PasswordsProps } from "../interfaces";
import Pwd from "./pwd/pwd";

const Passwords = ({ values, handlers }: PasswordsProps) => {
  return (
    <div className="passwords">
      {values.pwds.map((pwd) => {
        return <Pwd onCheckPwd={handlers.onCheckPwd} pwd={pwd} />;
      })}
    </div>
  );
};
export default Passwords;
