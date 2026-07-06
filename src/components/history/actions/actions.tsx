import { ActionsProps } from "./interfaces";

const Actions = ({ handlers, values }: ActionsProps) => {
  return (
    <div className="actions">
      <button
        type="button"
        onClick={handlers.clearHistoryHandler}
        className="btn btn-ghost"
      >
        Clear
      </button>
      <button
        type="button"
        onClick={handlers.copyAll}
        className="btn btn-secondary"
      >
        Copy all
      </button>
      {values.copyNotification && (
        <div className="notification-history" role="status">
          Copied
        </div>
      )}
    </div>
  );
};

export default Actions;
