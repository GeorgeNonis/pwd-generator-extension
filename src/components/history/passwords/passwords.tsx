import { PasswordsProps } from "../interfaces";
import Pwd from "./pwd/pwd";

const Passwords = ({ values, handlers }: PasswordsProps) => {
  return (
    <div className="passwords">
      {values.pwds.map((pwd) => (
        <Pwd key={pwd} pwd={pwd} onCopied={handlers.onCopied} />
      ))}
    </div>
  );
};

export default Passwords;
