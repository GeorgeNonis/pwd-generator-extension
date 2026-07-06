import { OptionProps } from "./interfaces";

const Option = ({ comp, component, componentHandler }: OptionProps) => {
  const isActive = component === comp;

  return (
    <button
      type="button"
      className={`nav-tab ${isActive ? "active" : ""}`}
      onClick={() => componentHandler(comp)}
      aria-current={isActive ? "page" : undefined}
    >
      {comp}
    </button>
  );
};

export default Option;
