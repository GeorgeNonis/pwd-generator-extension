import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { clearHistorry } from "../../store/pwds-slice";
import { useState } from "react";

export const useHistory = () => {
  const { pwds, history } = useSelector((state: IRootState) => state.pwds);
  const [copypwds, setCopyPwds] = useState<string[]>([]);
  const [selectState, setSelectState] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);
  const dispatch = useDispatch();
  const disableCopySelected = copypwds.length === 0;

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

  const notificationHandler = () => {
    setCopyNotification(true);
    setTimeout(() => {
      setCopyNotification(false);
    }, 2000);
  };

  const copySelected = () => {
    navigator.clipboard
      .writeText(copypwds.join(","))
      .then(() => {})
      .catch((error) => {});
    notificationHandler();
  };

  const copyAll = () => {
    navigator.clipboard
      .writeText(pwds.join(","))
      .then(() => {})
      .catch((error) => {});
    notificationHandler();
  };

  const unSelectHandler = () => {
    setSelectState(!selectState);
    setCopyPwds([]);
  };

  const disableStyle = {
    cursor: "not-allowed",
    backgroundColor: "#9d9d9d",
    color: "#686868",
  };

  const handlers = {
    onCheckPwd,
    clearHistorry,
    clearHistoryHandler,
    copySelected,
    copyAll,
    unSelectHandler,
  };

  const values = {
    disableStyle,
    disableCopySelected,
    pwds,
    history,
    copyNotification,
    selectState,
  };
  return {
    values,
    handlers,
  };
};
