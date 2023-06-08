import "../../App.css";
import { components } from "../../config";
import { useNavbar } from "./useNavbar";

const Navbar = () => {
  const { componentHandler, component } = useNavbar();

  return (
    <div className="navbar">
      {components.map((comp) => {
        return (
          <button
            onClick={() => componentHandler(comp)}
            style={
              component === comp ? { backgroundColor: "#007bff" } : undefined
            }
          >
            {comp}
          </button>
        );
      })}
    </div>
  );
};
export default Navbar;
