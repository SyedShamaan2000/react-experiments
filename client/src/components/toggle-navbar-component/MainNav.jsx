import React, { useState } from "react";
import styles from "./main-nav.module.css";
import NavItem1 from "./NavItem1";
import NavItem2 from "./NavItem2";

const MainNav = () => {
    const [selectedNavItem, setSelectedNavItem] = useState("NavItem1");

    return (
        <>
            <div className={styles.container}>
                <div className={styles.navItems}>
                    <div
                        className={styles.navItem1}
                        onClick={() => setSelectedNavItem("NavItem1")}
                    >
                        Item 1
                    </div>
                    <div
                        className={styles.navItem2}
                        onClick={() => setSelectedNavItem("NavItem2")}
                    >
                        Item 2
                    </div>
                </div>
            </div>
            {selectedNavItem === "NavItem1" && <NavItem1 />}
            {selectedNavItem === "NavItem2" && <NavItem2 />}
        </>
    );
};

export default MainNav;
