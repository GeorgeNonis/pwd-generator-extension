import { useState } from "react";
import "./App.css";
import PasswordGeneratorForm from "./components/passwordgenerator";

const App = () => {
  const [password, setPassword] = useState("");
  const handleGeneratePassword = (password: string) => {
    setPassword(password);
  };
  return (
    <div className="App">
      <h1 className="title">Nonis Password Generator</h1>
      <PasswordGeneratorForm onGeneratePassword={handleGeneratePassword} />
      <h3>{password ?? undefined}</h3>
    </div>
  );
};

export default App;
