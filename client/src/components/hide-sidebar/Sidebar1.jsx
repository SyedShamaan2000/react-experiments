import React, { useState } from "react";
import styles from "./sidebar1.module.css";

const sidebarItems = ["Item1", "Item2", "Item3", "Item4"];

const Sidebar1 = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${styles.sidebarContainer} ${
        open ? styles.sidebarContainer : styles.closed
      }`}
    >
      <div className={styles.sidebarItems}>
        <button className={styles.openCloseBtn} onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>
        {open ? (
          <>
            {sidebarItems.map((items) => (
              <div className={styles.sidebarItem}>{items}</div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Sidebar1;
