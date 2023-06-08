export interface ActionsProps {
  handlers: {
    onCheckPwd: (pwd: string, checked: boolean) => void;
    clearHistorry: () => void;
    clearHistoryHandler: () => void;
    copySelected: () => void;
    copyAll: () => void;
  };
  values: {
    disableStyle: {
      cursor: string;
      backgroundColor: string;
      color: string;
    };
    disableCopySelected: boolean;
    pwds: string[];
    history: boolean;
    copyNotification: boolean;
  };
}
