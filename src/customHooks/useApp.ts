import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { historyHandler, setPasswords } from "../store/pwds-slice";

export const useApp = () => {
  const { component, pwds } = useSelector((state: IRootState) => state.pwds);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  // const [pwds, setPwds] = useState<string[]>([]);
  const handleGeneratePassword = (password: string) => {
    setPassword(password);

    // setPwds((prevState) => {
    //   console.log(typeof password);
    //   return [...prevState, `${password}`];
    // });
    dispatch(setPasswords({ pwds }));
    chrome.storage.sync.set({ pwds }, () => {});
  };

  useEffect(() => {
    chrome.storage.sync.get(["history"], (result: any) => {
      const { history } = result;
      if (history === undefined) {
        chrome.storage.sync.set({ history: false }, () => {});
      } else {
        dispatch(historyHandler({ history }));
        history &&
          chrome.storage.sync.get(["pwds"], (result: any) => {
            const { pwds } = result;
            if (pwds === undefined) {
              chrome.storage.sync.set({ pwds: [] }, () => {});
            } else {
              dispatch(setPasswords({ pwds }));
            }
          });
      }
    });
  }, []);

  const values = {
    component,
  };

  return {
    handleGeneratePassword,
    values,
  };
};
