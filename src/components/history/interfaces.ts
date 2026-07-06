export interface PasswordsProps {
  values: {
    pwds: string[];
  };
  handlers: {
    onCopied: () => void;
  };
}

export interface PwdProps {
  pwd: string;
  onCopied: () => void;
}
