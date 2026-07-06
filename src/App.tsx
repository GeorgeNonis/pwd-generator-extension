import { useEffect } from "react";
import "./App.css";
import { useApp } from "./customHooks/useApp";
import {
  PasswordGeneratorForm,
  Passwords,
  Settings,
  Navbar,
} from "./components";

const App = () => {
  const { handleGeneratePassword, values } = useApp();

  useEffect(() => {
    const container = document.querySelector(".container");
    container?.setAttribute("data-theme", values.theme);
  }, [values.theme]);

  const views = {
    generator: (
      <PasswordGeneratorForm onGeneratePassword={handleGeneratePassword} />
    ),
    settings: <Settings />,
    history: <Passwords />,
  } as const;

  return (
    <div className="App" data-theme={values.theme}>
      <header className="app-header">
        <h1 className="title">Password Generator</h1>
        <p className="subtitle">Secure passwords, one click</p>
      </header>
      <Navbar />
      <main className="app-main">
        {views[values.component as keyof typeof views]}
      </main>
    </div>
  );
};

export default App;
