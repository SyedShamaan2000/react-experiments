// File: MainTextComparison.jsx
import React, { useState } from "react";
import TextInput from "./TextInput";
import ComparisonView from "./ComparisonView";
import AnalysisPanel from "./AnalysisPanel";
import styles from "./MainTextComparison.module.css";

function MainTextComparison() {
  const [textOne, setTextOne] = useState("");
  const [textTwo, setTextTwo] = useState("");
  const [viewMode, setViewMode] = useState("full"); // 'full', 'differences'

  const handleTextOneChange = (text) => {
    setTextOne(text);
  };

  const handleTextTwoChange = (text) => {
    setTextTwo(text);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Text Comparison Tool</h1>
        <div className={styles.viewControls}>
          <button
            className={
              viewMode === "full" ? styles.activeButton : styles.button
            }
            onClick={() => handleViewModeChange("full")}
          >
            Full Text
          </button>
          <button
            className={
              viewMode === "differences" ? styles.activeButton : styles.button
            }
            onClick={() => handleViewModeChange("differences")}
          >
            Differences Only
          </button>
        </div>
      </header>

      <div className={styles.inputContainer}>
        <TextInput
          label="Text 1"
          text={textOne}
          onTextChange={handleTextOneChange}
        />
        <TextInput
          label="Text 2"
          text={textTwo}
          onTextChange={handleTextTwoChange}
        />
      </div>

      <AnalysisPanel textOne={textOne} textTwo={textTwo} />

      <ComparisonView textOne={textOne} textTwo={textTwo} viewMode={viewMode} />
    </div>
  );
}

export default MainTextComparison;
