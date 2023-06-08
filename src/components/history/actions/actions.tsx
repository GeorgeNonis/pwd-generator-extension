import { ActionsProps } from "./interfaces";

const Actions = ({ handlers, values }: ActionsProps) => {
  return (
    <div className="actions">
      <button onClick={handlers.clearHistoryHandler} className="clearhistory">
        Clear History
      </button>
      <button
        onClick={handlers.copySelected}
        disabled={values.disableCopySelected}
        className="copyselected"
        style={values.disableCopySelected ? values.disableStyle : undefined}
      >
        Copy Selected
      </button>
      <button onClick={handlers.copyAll} className="copyall">
        Copy All
      </button>
    </div>
  );
};
export default Actions;
