import { FcInfo } from "react-icons/fc";

const Warning = () => {
  return (
    <div className="warning">
      <FcInfo className="svg" />
      <p className="warningp">
        If you use remembering of password history,don't forget to clear the
        list manualy to prevent stealing your password's!
      </p>
    </div>
  );
};
export default Warning;
