import { useHistory } from "./useHistory";

const History = () => {
  const { history, pwds } = useHistory();
  return (
    <div>
      {history ? (
        <ul>
          {pwds.map((pwd) => {
            return <li>{pwd}</li>;
          })}
        </ul>
      ) : (
        <p>No items found...</p>
      )}
    </div>
  );
};
export default History;
