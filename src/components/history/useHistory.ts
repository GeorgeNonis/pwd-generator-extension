import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { clearHistorry } from "../../store/pwds-slice";
import { useState } from "react";

export const useHistory = () => {
  const { pwds, history } = useSelector((state: IRootState) => state.pwds);
  const [copypwds, setCopyPwds] = useState<string[]>([]);
  const dispatch = useDispatch();

  const onCheckPwd = (pwd: string, checked: boolean) => {
    if (checked) {
      setCopyPwds((prev) => {
        return [...prev, pwd];
      });
    } else {
      setCopyPwds((prev) => {
        return [...prev.filter((p) => p !== pwd)];
      });
    }
  };

  const clearHistoryHandler = () => {
    dispatch(clearHistorry());
    chrome.storage.sync.set({ pwds: [] }, () => {});
  };

  const copySelected = () => {
    navigator.clipboard
      .writeText(copypwds.join(","))
      .then(() => {})
      .catch((error) => {});
  };

  const copyAll = () => {
    navigator.clipboard
      .writeText(pwds.join(","))
      .then(() => {})
      .catch((error) => {});
  };

  const handleCopyPassword = (pwd: string) => {
    navigator.clipboard
      .writeText(pwd)
      .then(() => {})
      .catch((error) => {});

    // setCopyNotification(true);
    // setTimeout(() => {
    //   setCopyNotification(false);
    // }, 2000);
  };

  const disableCopySelected = copypwds.length === 0;

  const disableStyle = {
    cursor: "not-allowed",
    backgroundColor: "#9d9d9d",
    color: "#686868",
  };

  const handlers = {
    onCheckPwd,
    clearHistorry,
    handleCopyPassword,
    clearHistoryHandler,
    copySelected,
    copyAll,
  };

  const values = {
    disableStyle,
    disableCopySelected,
    pwds,
    history,
  };
  return {
    values,
    handlers,
  };
};
