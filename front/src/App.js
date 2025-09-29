import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./utils/Routes";
import { initTheme } from "./utils/Theme";

function App() {
  useEffect(() => { initTheme("peach");}, []);
  return <AppRoutes />;
}

export default App;
