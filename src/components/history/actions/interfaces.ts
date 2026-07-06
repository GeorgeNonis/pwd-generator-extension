export interface ActionsProps {
  handlers: {
    clearHistoryHandler: () => void;
    copyAll: () => void;
  };
  values: {
    copyNotification: boolean;
  };
}
