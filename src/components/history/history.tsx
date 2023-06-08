import "../../App.css";
import { useHistory } from "./useHistory";

const History = () => {
  const { handlers, values } = useHistory();
  return (
    <div className="history">
      {history ? (
        values.pwds.length === 0 ? (
          <p>No items found...</p>
        ) : (
          <>
            <div className="passwords">
              {values.pwds.map((pwd) => {
                return (
                  <label htmlFor={pwd}>
                    {pwd}
                    <input
                      type="checkbox"
                      id={pwd}
                      name={pwd}
                      onChange={(e) => {
                        handlers.onCheckPwd(pwd, e.target.checked);
                      }}
                    />
                  </label>
                );
              })}
            </div>
            <div className="actions">
              <button
                onClick={handlers.clearHistoryHandler}
                className="clearhistory"
              >
                Clear History
              </button>
              <button
                onClick={handlers.copySelected}
                disabled={values.disableCopySelected}
                className="copyselected"
                style={
                  values.disableCopySelected ? values.disableStyle : undefined
                }
              >
                Copy Selected
              </button>
              <button onClick={handlers.copyAll} className="copyall">
                Copy All
              </button>
            </div>
          </>
        )
      ) : (
        <p>No items found...</p>
      )}
    </div>
  );
};
export default History;
