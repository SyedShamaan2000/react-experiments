import React from "react";
import "./App.css";
import MainCssApp from "./components/css-experiment/MainCssApp";
import MainNav from "./components/toggle-navbar-component/MainNav";
import PropsStateArchitectureDemo from "./components/react-props-state-architecture-demo/PropsStateArchitectureDemo";
import ReactPerformanceDashboardDemo from "./components/react-props-state-architecture-demo/ReactPerformanceDashboardDemo";

function App() {
  return (
    <>
      {/* <MainCssApp /> */}
      {/* <MainNav /> */}
      {/* <PropsStateArchitectureDemo /> */}
      <ReactPerformanceDashboardDemo />
    </>
  );
}

export default App;
