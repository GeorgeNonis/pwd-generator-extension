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

  interface Components {
    [key: string]: JSX.Element;
  }

  const components: Components = {
    generator: (
      <PasswordGeneratorForm onGeneratePassword={handleGeneratePassword} />
    ),
    settings: <Settings />,
    history: <Passwords />,
  };

  return (
    <div className="App">
      <h1 className="title">Nonis Password Generator</h1>
      <Navbar />
      {components[values.component as keyof Components]}
    </div>
  );
};

export default App;
