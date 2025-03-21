// File: components/AnalysisPanel.jsx
import React, { useMemo } from "react";
import styles from "./AnalysisPanel.module.css";

function AnalysisPanel({ textOne, textTwo }) {
  const analysis = useMemo(() => {
    if (!textOne && !textTwo) {
      return {
        similarityPercentage: 0,
        text1WordCount: 0,
        text2WordCount: 0,
        text1CharCount: 0,
        text2CharCount: 0,
        wordCountDiff: 0,
        charCountDiff: 0,
      };
    }

    // Calculate word counts
    const text1Words = textOne.trim() ? textOne.split(/\s+/).length : 0;
    const text2Words = textTwo.trim() ? textTwo.split(/\s+/).length : 0;

    // Calculate character counts (excluding whitespace)
    const text1Chars = textOne.replace(/\s/g, "").length;
    const text2Chars = textTwo.replace(/\s/g, "").length;

    // Calculate word and character count differences
    const wordCountDiff = Math.abs(text1Words - text2Words);
    const charCountDiff = Math.abs(text1Chars - text2Chars);

    // Simple similarity calculation
    // This is a very basic approach - could be replaced with more sophisticated algorithms
    let similarityPercentage = 0;
    if (text1Chars > 0 || text2Chars > 0) {
      const maxLength = Math.max(textOne.length, textTwo.length);
      let matchingChars = 0;

      for (let i = 0; i < maxLength; i++) {
        if (
          i < textOne.length &&
          i < textTwo.length &&
          textOne[i] === textTwo[i]
        ) {
          matchingChars++;
        }
      }

      similarityPercentage = Math.round((matchingChars / maxLength) * 100);
    }

    return {
      similarityPercentage,
      text1WordCount: text1Words,
      text2WordCount: text2Words,
      text1CharCount: text1Chars,
      text2CharCount: text2Chars,
      wordCountDiff,
      charCountDiff,
    };
  }, [textOne, textTwo]);

  return (
    <div className={styles.analysisPanel}>
      <div className={styles.metricContainer}>
        <div className={styles.metric}>
          <h4>Similarity</h4>
          <div className={styles.value}>{analysis.similarityPercentage}%</div>
        </div>

        <div className={styles.metric}>
          <h4>Word Count</h4>
          <div className={styles.counts}>
            <span>Text 1: {analysis.text1WordCount}</span>
            <span>Text 2: {analysis.text2WordCount}</span>
            <span className={styles.diff}>Diff: {analysis.wordCountDiff}</span>
          </div>
        </div>

        <div className={styles.metric}>
          <h4>Character Count</h4>
          <div className={styles.counts}>
            <span>Text 1: {analysis.text1CharCount}</span>
            <span>Text 2: {analysis.text2CharCount}</span>
            <span className={styles.diff}>Diff: {analysis.charCountDiff}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPanel;
