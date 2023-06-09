import { useEffect, useState } from "react";

export const usePwd = (selectState: boolean) => {
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    setCheckbox(false);
  }, [selectState]);
  return {
    setCheckbox,
    checkbox,
  };
};
