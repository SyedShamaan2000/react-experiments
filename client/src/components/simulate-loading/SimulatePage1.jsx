import React, { useEffect, useState } from "react";
import SimulatePage2 from "./SimulatePage2";
import styles from "./simulate-page.module.css";

const SimulatePage1 = () => {
  const [showPage2, setShowPage2] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleButtonClicked = () => {
    setLoadingPage(true);
    setTimeout(() => {
      setDataLoaded(true);
    }, 5000);
    if (dataLoaded) {
      setLoadingPage(false);
    }
  };

  return (
    <div>
      {dataLoaded ? (
        <>
          <SimulatePage2 />
        </>
      ) : (
        <>
          {loadingPage ? (
            <>
              <div className={styles.simulatePage}></div>
            </>
          ) : (
            <>
              <button onClick={handleButtonClicked}>
                Click Here to Simulate to Another Page
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SimulatePage1;
