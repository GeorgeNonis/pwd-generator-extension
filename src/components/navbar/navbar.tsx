import "../../App.css";
import Option from "./option";
import { components } from "../../config";
import { useNavbar } from "./useNavbar";

const Navbar = () => {
  const { componentHandler, component } = useNavbar();

  return (
    <div className="navbar">
      {components.map((comp) => {
        return (
          <Option
            comp={comp}
            component={component}
            componentHandler={componentHandler}
          />
        );
      })}
    </div>
  );
};
export default Navbar;
