import "../../App.css";
import Actions from "./actions/actions";
import Passwords from "./passwords/passwords";
import { useHistory } from "./useHistory";

const History = () => {
  const { handlers, values } = useHistory();

  if (!values.history) {
    return (
      <div className="empty-state">
        <p>History is disabled.</p>
        <p className="empty-hint">Enable it in Settings to save generated passwords.</p>
      </div>
    );
  }

  if (values.pwds.length === 0) {
    return (
      <div className="empty-state">
        <p>No passwords saved yet.</p>
        <p className="empty-hint">Generate a password with history enabled.</p>
      </div>
    );
  }

  return (
    <div className="history">
      <Passwords
        handlers={{ onCopied: handlers.showCopyNotification }}
        values={{ pwds: values.pwds }}
      />
      <Actions
        handlers={{
          clearHistoryHandler: handlers.clearHistoryHandler,
          copyAll: handlers.copyAll,
          exportHistory: handlers.exportHistory,
        }}
        values={{ copyNotification: values.copyNotification }}
      />
    </div>
  );
};

export default History;
