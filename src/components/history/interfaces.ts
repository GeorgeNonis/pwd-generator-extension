export interface PasswordsProps {
  values: {
    pwds: string[];
  };
  handlers: {
    onCheckPwd: (pwd: string, checked: boolean) => void;
  };
}

export interface PwdProps {
  pwd: string;
  onCheckPwd: (pwd: string, checked: boolean) => void;
}
