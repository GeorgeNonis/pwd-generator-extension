import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

export const useHistory = () => {
  const { pwds, history } = useSelector((state: IRootState) => state.pwds);
  return {
    pwds,
    history,
  };
};
