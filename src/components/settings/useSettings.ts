import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { historyHandler } from "../../store/pwds-slice";

export const useSettings = () => {
  const { history } = useSelector((state: IRootState) => state.pwds);
  const dispatch = useDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = e.target.checked;
    dispatch(historyHandler({ history: state }));
    chrome.storage.sync.set({ history: state }, () => {});
  };

  return {
    onChangeHandler,
    history,
  };
};
