import { FcInfo } from "react-icons/fc";

const Warning = () => {
  return (
    <div className="warning" role="note">
      <FcInfo className="warning-icon" aria-hidden="true" />
      <p className="warning-text">
        Stored passwords persist in Chrome sync storage. Clear history regularly
        on shared machines.
      </p>
    </div>
  );
};

export default Warning;
