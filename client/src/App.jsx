import React from "react";
import "./App.css";
import MainCssApp from "./components/css-experiment/MainCssApp";
import MainNav from "./components/toggle-navbar-component/MainNav";
import PropsStateArchitectureDemo from "./components/react-props-state-architecture-demo/PropsStateArchitectureDemo";
import ReactPerformanceDashboardDemo from "./components/react-props-state-architecture-demo/ReactPerformanceDashboardDemo";
import ControlledUncontrolledInputDemo from "./components/react-props-state-architecture-demo/ControlledUncontrolledInputDemo";

function App() {
  return (
    <>
      {/* <MainCssApp /> */}
      {/* <MainNav /> */}
      {/* <PropsStateArchitectureDemo /> */}
      {/* <ReactPerformanceDashboardDemo /> */}
      <ControlledUncontrolledInputDemo />
    </>
  );
}

export default App;
