import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import {
  excludeAmbiguousHandler,
  historyHandler,
  themeHandler,
} from "../../store/pwds-slice";

export const useSettings = () => {
  const { history, theme, excludeAmbiguous } = useSelector(
    (state: IRootState) => state.pwds
  );
  const dispatch = useDispatch();

  const onHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = e.target.checked;
    dispatch(historyHandler({ history: state }));
    chrome.storage.sync.set({ history: state }, () => {});
  };

  const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTheme = e.target.checked ? "light" : "dark";
    dispatch(themeHandler({ theme: nextTheme }));
    chrome.storage.sync.set({ theme: nextTheme }, () => {});
  };

  const onExcludeAmbiguousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = e.target.checked;
    dispatch(excludeAmbiguousHandler({ excludeAmbiguous: state }));
    chrome.storage.sync.set({ excludeAmbiguous: state }, () => {});
  };

  return {
    history,
    theme,
    excludeAmbiguous,
    onHistoryChange,
    onThemeChange,
    onExcludeAmbiguousChange,
  };
};
