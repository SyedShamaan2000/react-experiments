// File: components/ComparisonView.jsx
import React, { useEffect, useRef } from "react";
import styles from "./ComparisonView.module.css";
import { diffChars, diffWords } from "diff";

function ComparisonView({ textOne, textTwo, viewMode }) {
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  // Synchronize scrolling between panels
  useEffect(() => {
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    if (!leftPanel || !rightPanel) return;

    const handleLeftScroll = () => {
      rightPanel.scrollTop = leftPanel.scrollTop;
      rightPanel.scrollLeft = leftPanel.scrollLeft;
    };

    const handleRightScroll = () => {
      leftPanel.scrollTop = rightPanel.scrollTop;
      leftPanel.scrollLeft = rightPanel.scrollLeft;
    };

    leftPanel.addEventListener("scroll", handleLeftScroll);
    rightPanel.addEventListener("scroll", handleRightScroll);

    return () => {
      leftPanel.removeEventListener("scroll", handleLeftScroll);
      rightPanel.removeEventListener("scroll", handleRightScroll);
    };
  }, []);

  // Generate diff between the two texts
  const generateDiff = () => {
    // Use character-level diff for more precise comparison
    const differences = diffChars(textOne, textTwo);

    const leftContent = [];
    const rightContent = [];

    differences.forEach((part) => {
      const spanClass = part.added
        ? styles.added
        : part.removed
        ? styles.removed
        : "";

      // Only show common parts in "full" mode
      if (part.added) {
        rightContent.push(
          <span key={Math.random()} className={spanClass}>
            {part.value}
          </span>
        );
      } else if (part.removed) {
        leftContent.push(
          <span key={Math.random()} className={spanClass}>
            {part.value}
          </span>
        );
      } else if (
        viewMode === "full" ||
        (viewMode === "differences" && part.value.trim())
      ) {
        leftContent.push(
          <span key={Math.random()} className={spanClass}>
            {part.value}
          </span>
        );
        rightContent.push(
          <span key={Math.random()} className={spanClass}>
            {part.value}
          </span>
        );
      }
    });

    return { leftContent, rightContent };
  };

  const { leftContent, rightContent } = generateDiff();

  return (
    <div className={styles.comparisonContainer}>
      <div className={styles.panelHeader}>
        <h3>Text 1</h3>
        <h3>Text 2</h3>
      </div>
      <div className={styles.panels}>
        <div ref={leftPanelRef} className={styles.panel}>
          {textOne ? (
            leftContent
          ) : (
            <p className={styles.placeholder}>Enter text to compare</p>
          )}
        </div>
        <div ref={rightPanelRef} className={styles.panel}>
          {textTwo ? (
            rightContent
          ) : (
            <p className={styles.placeholder}>Enter text to compare</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComparisonView;
