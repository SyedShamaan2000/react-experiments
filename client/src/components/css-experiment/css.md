# Handling CSS Conflicts in React Components

## Issue: Overlapping CSS Styles

When using standard CSS files in a React project, styles are **globally applied**. If multiple components have the same class name, the latest imported CSS file will **override** previous styles.

### Example Issue:

#### **CssComponent1.jsx**

```jsx
import React from "react";
import "./css1.css";

const CssComponent1 = () => {
    return <div className="container">CssComponent1</div>;
};

export default CssComponent1;
```

#### **CssComponent2.jsx**

```jsx
import React from "react";
import "./css2.css";

const CssComponent2 = () => {
    return <div className="container">CssComponent2</div>;
};

export default CssComponent2;
```

#### **css1.css**

```css
.container {
    height: 50vh;
    width: 50vh;
    background-color: aqua;
}
```

#### **css2.css**

```css
.container {
    height: 50vh;
    width: 50vh;
    background-color: rebeccapurple;
}
```

### **Problem**

Since both CSS files define a `.container` class, the last imported CSS file (`css2.css`) **overwrites** styles for all components using `.container`. As a result, `CssComponent1` will also have `background-color: rebeccapurple;` instead of `aqua`.

---

## Solution: Use CSS Modules

To **avoid style conflicts**, use **CSS Modules**, which scope styles to the component level.

### **Steps to Fix**

### **Step 1: Rename CSS Files**

Change the CSS file extensions to `.module.css`:

-   `css1.module.css`
-   `css2.module.css`

### **Step 2: Update CSS Files**

#### **css1.module.css**

```css
.container {
    height: 50vh;
    width: 50vh;
    background-color: aqua;
}
```

#### **css2.module.css**

```css
.container {
    height: 50vh;
    width: 50vh;
    background-color: rebeccapurple;
}
```

### **Step 3: Import Styles Correctly in Components**

#### **CssComponent1.jsx**

```jsx
import React from "react";
import styles from "./css1.module.css";

const CssComponent1 = () => {
    return <div className={styles.container}>CssComponent1</div>;
};

export default CssComponent1;
```

#### **CssComponent2.jsx**

```jsx
import React from "react";
import styles from "./css2.module.css";

const CssComponent2 = () => {
    return <div className={styles.container}>CssComponent2</div>;
};

export default CssComponent2;
```

---

## **Why Use CSS Modules?**

✅ **Scoped Styles** – Each `.container` class is unique to its component.
✅ **No Conflicts** – Components won't override each other's styles.
✅ **Better Maintainability** – Keeps styles modular and avoids global CSS pollution.

Now, both components will have their intended background colors without interference! 🚀
