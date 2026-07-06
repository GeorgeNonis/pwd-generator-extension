import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import {
  excludeAmbiguousHandler,
  historyHandler,
  historyPush,
  setPasswords,
  themeHandler,
} from "../store/pwds-slice";

export const useApp = () => {
  const { component, pwds, history } = useSelector(
    (state: IRootState) => state.pwds
  );
  const theme = useSelector((state: IRootState) => state.pwds.theme);
  const dispatch = useDispatch();

  const handleGeneratePassword = (password: string) => {
    if (!history) return;
    dispatch(historyPush({ pwd: password }));

    chrome.storage.sync.set({ pwds: [...pwds, password] }, () => {});
  };

  useEffect(() => {
    chrome.storage.sync.get(
      ["history", "theme", "excludeAmbiguous"],
      (result: {
        history?: boolean;
        theme?: "light" | "dark";
        excludeAmbiguous?: boolean;
      }) => {
        const { history, theme, excludeAmbiguous } = result;

        if (history === undefined) {
          chrome.storage.sync.set({ history: false }, () => {});
        } else {
          dispatch(historyHandler({ history }));
          history &&
            chrome.storage.sync.get(["pwds"], (pwdResult: { pwds?: string[] }) => {
              const { pwds } = pwdResult;
              if (pwds === undefined) {
                chrome.storage.sync.set({ pwds: [] }, () => {});
              } else {
                dispatch(setPasswords({ pwds }));
              }
            });
        }

        if (theme === undefined) {
          chrome.storage.sync.set({ theme: "dark" }, () => {});
        } else {
          dispatch(themeHandler({ theme }));
        }

        if (excludeAmbiguous === undefined) {
          chrome.storage.sync.set({ excludeAmbiguous: false }, () => {});
        } else {
          dispatch(excludeAmbiguousHandler({ excludeAmbiguous }));
        }
      }
    );
  }, [dispatch]);

  const values = {
    component,
    theme,
  };

  return {
    handleGeneratePassword,
    values,
  };
};
