import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcInfo } from "react-icons/fc";
import { IRootState } from "../../store/store";
import { historyHandler } from "../../store/pwds-slice";

const Settings = () => {
  const { history } = useSelector((state: IRootState) => state.pwds);
  const dispatch = useDispatch();
  // const [checkbox,setCheckbox] = useState(false)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = e.target.checked;
    dispatch(historyHandler({ history: state }));
    chrome.storage.sync.set({ history: state }, () => {});
  };
  return (
    <div className="settings">
      <label htmlFor="settings" className="label">
        Remeber history of passwords
        <input
          type="checkbox"
          name="settings"
          id="settings"
          checked={history}
          onChange={onChangeHandler}
        />
      </label>
      <div className="warning">
        <FcInfo className="svg" />
        <p className="warningp">
          If you use remembering of password history,don't forget to clear the
          list manualy to prevent stealing your password's!
        </p>
      </div>
    </div>
  );
};
export default Settings;
