import { OptionProps } from "./interfaces";

const Option = ({ comp, component, componentHandler }: OptionProps) => {
  return (
    <button
      onClick={() => componentHandler(comp)}
      style={component === comp ? { backgroundColor: "#007bff" } : undefined}
    >
      {comp}
    </button>
  );
};
export default Option;
