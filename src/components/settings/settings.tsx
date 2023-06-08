const Settings = () => {
  return (
    <div>
      <label htmlFor="history">
        Remeber history of passwords
        <input type="checkbox" name="history" id="history" />
      </label>
      <div className="warning">
        <p>
          If you use remembering of password history,don't forget to clear the
          list manualy to prevent stealing your password's!
        </p>
      </div>
    </div>
  );
};
export default Settings;
