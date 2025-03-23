// File: components/TextInput.jsx
import React from "react";
import styles from "./TextInput.module.css";

function TextInput({ label, text, onTextChange }) {
  const handleTextChange = (e) => {
    onTextChange(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onTextChange(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onTextChange(text);
    } catch (err) {
      alert("Failed to read clipboard contents. Please paste manually.");
    }
  };

  return (
    <div className={styles.textInputContainer}>
      <div className={styles.header}>
        <h2>{label}</h2>
        <div className={styles.actions}>
          <label className={styles.fileUpload}>
            Upload File
            <input
              type="file"
              accept=".txt,.md,.html,.css,.js,.jsx,.json"
              onChange={handleFileUpload}
            />
          </label>
          <button className={styles.pasteButton} onClick={handlePaste}>
            Paste
          </button>
        </div>
      </div>
      <textarea
        className={styles.textArea}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter or paste text here..."
      />
    </div>
  );
}

export default TextInput;
