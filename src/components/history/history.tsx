import "../../App.css";
import Actions from "./actions/actions";
import Passwords from "./passwords/passwords";
import { useHistory } from "./useHistory";

const History = () => {
  const { handlers, values } = useHistory();
  const notification = values.copyNotification && (
    <div className="notification-history">Copied!</div>
  );
  return (
    <div className="history">
      {values.history ? (
        values.pwds.length === 0 ? (
          <p>No items found...</p>
        ) : (
          <>
            <Passwords handlers={handlers} values={values} />
            <Actions handlers={handlers} values={values} />
            {notification}
          </>
        )
      ) : (
        <p>No items found...</p>
      )}
    </div>
  );
};
export default History;
