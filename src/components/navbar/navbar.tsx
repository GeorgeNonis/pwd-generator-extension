import "../../App.css";
import Option from "./option";
import { components } from "../../config";
import { useNavbar } from "./useNavbar";

const Navbar = () => {
  const { componentHandler, component } = useNavbar();

  return (
    <nav className="navbar" aria-label="Extension sections">
      {components.map((comp) => (
        <Option
          key={comp}
          comp={comp}
          component={component}
          componentHandler={componentHandler}
        />
      ))}
    </nav>
  );
};

export default Navbar;
