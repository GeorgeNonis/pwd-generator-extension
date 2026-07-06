export interface ActionsProps {
  handlers: {
    clearHistoryHandler: () => void;
    copyAll: () => void;
    exportHistory: () => void;
  };
  values: {
    copyNotification: boolean;
  };
}
