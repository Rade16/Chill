import React from "react";
import Transition from "./screens/Transition/Transition";
import ScreenSwitchboard from "./routes/ScreenSwitchboard";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <ScreenSwitchboard />
      </BrowserRouter>
    </>
  );
}

export default App;
