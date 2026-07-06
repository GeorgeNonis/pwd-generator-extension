import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { clearHistorry } from "../../store/pwds-slice";
import { useState } from "react";
import {
  buildHistoryExportContent,
  downloadTextFile,
  HISTORY_EXPORT_FILENAME,
} from "../../lib/exportHistory";

export const useHistory = () => {
  const { pwds, history } = useSelector((state: IRootState) => state.pwds);
  const [copyNotification, setCopyNotification] = useState(false);
  const dispatch = useDispatch();

  const clearHistoryHandler = () => {
    dispatch(clearHistorry());
    chrome.storage.sync.set({ pwds: [] }, () => {});
  };

  const showCopyNotification = () => {
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(pwds.join(","));
    showCopyNotification();
  };

  const exportHistory = () => {
    const content = buildHistoryExportContent(pwds);
    downloadTextFile(content, HISTORY_EXPORT_FILENAME);
  };

  const handlers = {
    clearHistoryHandler,
    copyAll,
    exportHistory,
    showCopyNotification,
  };

  const values = {
    pwds,
    history,
    copyNotification,
  };

  return { values, handlers };
};
