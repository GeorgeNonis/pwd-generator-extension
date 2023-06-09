export interface PasswordsProps {
  values: {
    pwds: string[];
    selectState: boolean;
  };
  handlers: {
    onCheckPwd: (pwd: string, checked: boolean) => void;
  };
}

export interface PwdProps {
  pwd: string;
  selectState: boolean;

  onCheckPwd: (pwd: string, checked: boolean) => void;
}
