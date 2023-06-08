import { useDispatch, useSelector } from "react-redux";
import { changeCompo } from "../../store/pwds-slice";
import { IRootState } from "../../store/store";

export const useNavbar = () => {
  const { component } = useSelector((state: IRootState) => state.pwds);
  const dispatch = useDispatch();
  const componentHandler = (comp: string) => {
    dispatch(changeCompo({ comp }));
  };
  return {
    componentHandler,
    component,
  };
};
