// File: ComparePara.jsx
import React, { useState } from "react";
import styles from "./ComparePara.module.css";
import { diffLines, diffSentences } from "diff";

function ComparePara() {
  const [originalText, setOriginalText] = useState("");
  const [comparisonText, setComparisonText] = useState("");
  const [comparisonMode, setComparisonMode] = useState("sentences"); // 'sentences' or 'paragraphs'
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setComparisonText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const compareTexts = () => {
    // Ensure we have text to compare
    if (!originalText || !comparisonText) {
      alert("Please provide both original and comparison text");
      return;
    }

    setShowResults(true);
  };

  // Function to split text into sentences (basic implementation)
  const splitIntoSentences = (text) => {
    return text.replace(/([.!?])\s+/g, "$1\n").split("\n");
  };

  // Generate diff between the two texts
  const generateDiff = () => {
    if (comparisonMode === "paragraphs") {
      return diffLines(originalText, comparisonText, { newlineIsToken: true });
    } else {
      // For sentences, first split into sentences then compare
      const origSentences = splitIntoSentences(originalText).join("\n");
      const compSentences = splitIntoSentences(comparisonText).join("\n");
      return diffLines(origSentences, compSentences);
    }
  };

  const renderDiff = () => {
    if (!showResults) return null;

    const differences = generateDiff();

    return (
      <div className={styles.diffContainer}>
        {differences.map((part, index) => {
          let className = styles.unchanged;
          if (part.added) className = styles.added;
          if (part.removed) className = styles.removed;

          return (
            <div key={index} className={`${styles.diffPart} ${className}`}>
              <pre>{part.value}</pre>
            </div>
          );
        })}
      </div>
    );
  };

  const calculateStats = () => {
    if (!showResults) return null;

    const differences = generateDiff();

    let added = 0;
    let removed = 0;
    let unchanged = 0;

    differences.forEach((part) => {
      const lines = part.value.split("\n").length - 1;
      if (part.added) added += lines || 1;
      else if (part.removed) removed += lines || 1;
      else unchanged += lines || 1;
    });

    const totalParts = added + removed + unchanged;
    const similarityPercentage = totalParts
      ? Math.round((unchanged / totalParts) * 100)
      : 0;

    return (
      // <div className={styles.statsContainer}>
      //   <div className={styles.stat}>
      //     <div className={styles.statLabel}>Similarity</div>
      //     <div className={styles.statValue}>{similarityPercentage}%</div>
      //   </div>
      //   <div className={styles.stat}>
      //     <div className={styles.statLabel}>Added</div>
      //     <div className={styles.statValue}>
      //       {added} {comparisonMode}
      //     </div>
      //   </div>
      //   <div className={styles.stat}>
      //     <div className={styles.statLabel}>Removed</div>
      //     <div className={styles.statValue}>
      //       {removed} {comparisonMode}
      //     </div>
      //   </div>
      //   <div className={styles.stat}>
      //     <div className={styles.statLabel}>Unchanged</div>
      //     <div className={styles.statValue}>
      //       {unchanged} {comparisonMode}
      //     </div>
      //   </div>
      // </div>
      <></>
    );
  };

  return (
    <div className={styles.app}>
      {/* <header className={styles.header}> */}
      {/* <h1>Text Comparison Tool</h1> */}
      {/* </header> */}

      {/* <div className={styles.controlPanel}> */}
      {/* <div className={styles.modeSelector}>
          <span>Compare by: </span>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="sentences"
              checked={comparisonMode === "sentences"}
              onChange={() => setComparisonMode("sentences")}
            />
            Sentences
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="paragraphs"
              checked={comparisonMode === "paragraphs"}
              onChange={() => setComparisonMode("paragraphs")}
            />
            Paragraphs
          </label>
        </div> */}

      {/* <div className={styles.uploadControls}>
          <button
            className={styles.pasteButton}
            onClick={() => {
              navigator.clipboard
                .readText()
                .then((text) => {
                  setComparisonText(text);
                })
                .catch((err) => {
                  alert("Failed to read clipboard contents");
                });
            }}
          >
            Paste from Clipboard
          </button>
          <label className={styles.fileUpload}>
            Upload File
            <input
              type="file"
              accept=".txt,.md,.doc,.docx"
              onChange={handleFileUpload}
              className={styles.fileInput}
            />
          </label>
        </div> */}
      {/* </div> */}

      <div className={styles.inputContainer}>
        <div className={styles.textAreaContainer}>
          <h2>Original Text</h2>
          <textarea
            className={styles.textArea}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Enter or paste original text here..."
          />
        </div>

        <div className={styles.textAreaContainer}>
          <h2>Comparison Text</h2>
          <textarea
            className={styles.textArea}
            value={comparisonText}
            onChange={(e) => setComparisonText(e.target.value)}
            placeholder="Enter, paste, or upload text to compare..."
          />
        </div>
      </div>

      <div className={styles.actionContainer}>
        <button
          className={styles.compareButton}
          onClick={compareTexts}
          disabled={!originalText || !comparisonText}
        >
          Compare Texts
        </button>
      </div>

      {showResults && (
        <>
          {calculateStats()}
          <div className={styles.resultsContainer}>
            <h2>Comparison Results</h2>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendColor} ${styles.addedColor}`}
                ></div>
                <span>Added in comparison text</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendColor} ${styles.removedColor}`}
                ></div>
                <span>Removed from original text</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendColor} ${styles.unchangedColor}`}
                ></div>
                <span>Unchanged content</span>
              </div>
            </div>
            {renderDiff()}
          </div>
        </>
      )}
    </div>
  );
}

export default ComparePara;
