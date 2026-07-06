import { useState } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";
import { PwdProps } from "../../interfaces";

const Pwd = ({ pwd, onCopied }: PwdProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pwd);
    setCopied(true);
    onCopied();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pwd-row">
      <span className="pwd-text">{pwd}</span>
      <button
        type="button"
        className={`btn-copy ${copied ? "copied" : ""}`}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : `Copy ${pwd}`}
      >
        {copied ? <MdCheck aria-hidden="true" /> : <MdContentCopy aria-hidden="true" />}
      </button>
    </div>
  );
};

export default Pwd;
