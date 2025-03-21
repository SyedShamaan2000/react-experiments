// import React, { useState, useRef, useEffect } from "react";
// import styles from "./CompareParaWithChatInterface.module.css";

// function CompareParaWithChatInterface() {
//   const [inputMessage, setInputMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [document, setDocument] = useState({
//     "Executive Summary":
//       "Our executive summary provides an overview of the project's key objectives and goals.",
//     "Project Overview": `Sakesh Solutions LLC is poised to deliver a transformative technology services project for the Defense Logistics Agency (DLA) under the J6 Enterprise Technology Services (JETS) 2.0 initiative. Our approach is meticulously designed to enhance and modernize the technological capabilities of the DLA, ensuring alignment with the agency's evolving needs.

// Our project roadmap is structured to provide comprehensive support across various phases, leveraging our extensive experience in software development, IT consulting, and system integration. Key tasks include the development of a robust performance measurement system, integration of risk management frameworks, and the implementation of agile practices to ensure flexibility and responsiveness.

// We have assembled a dedicated team of experts, including technical leads, project managers, and quality assurance specialists, to execute tasks such as updating service credentials, conducting risk assessments, and implementing quality management systems. This team is committed to delivering high-quality documentation and ensuring the adequacy of all project deliverables.

// Our technical approach is grounded in the use of advanced technologies to optimize operational frameworks and manage resources effectively. By focusing on critical analysis and adherence to personnel and privacy requirements, we aim to deliver impactful and sustainable technology services that enhance the operational efficiency of the DLA.

// With a clear timeline and a detailed breakdown of tasks, Sakesh Solutions LLC is committed to achieving the objectives of the JETS 2.0 project, ensuring that the DLA's technological infrastructure is robust, secure, and future-ready.`,
//     "Objectives and Goals": `The primary objective of this project is to enhance the DLA's technological capabilities through the implementation of innovative solutions and frameworks.

// Our goals include:
// 1. Modernizing legacy systems to improve operational efficiency
// 2. Implementing robust security measures to protect sensitive data
// 3. Developing scalable solutions that can adapt to evolving requirements
// 4. Providing comprehensive training to ensure user adoption and success`,
//     "Technical Approach": `Our technical approach leverages industry-leading methodologies and tools to deliver high-quality solutions.

// We will utilize a combination of agile and waterfall methodologies, tailored to the specific requirements of each project phase. This hybrid approach allows us to maintain flexibility while ensuring that critical milestones are met within the established timeline.`,
//     "Implementation Strategy":
//       "Our implementation strategy focuses on minimizing disruption to ongoing operations while maximizing the impact of technology improvements.",
//     "Risk Management":
//       "We have developed a comprehensive risk management framework to identify, assess, and mitigate potential risks throughout the project lifecycle.",
//   });

//   const [originalDocument, setOriginalDocument] = useState({});
//   const [activeSection, setActiveSection] = useState("Project Overview");
//   const [showComparison, setShowComparison] = useState(false);
//   const [diffSection, setDiffSection] = useState("");

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     // Save original document
//     setOriginalDocument({ ...document });
//   }, []);

//   useEffect(() => {
//     // Scroll to bottom when messages update
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleInputChange = (e) => {
//     setInputMessage(e.target.value);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     // Add user message
//     setMessages([...messages, { sender: "user", text: inputMessage }]);

//     // Process request
//     processUserRequest(inputMessage);

//     // Clear input
//     setInputMessage("");
//   };

//   const processUserRequest = (request) => {
//     const req = request.toLowerCase();

//     setTimeout(() => {
//       // Check if request is to change content
//       if (req.includes("change") && req.includes("content")) {
//         let sectionToChange = "";

//         // Identify which section to change
//         for (const section in document) {
//           if (req.includes(section.toLowerCase())) {
//             sectionToChange = section;
//             break;
//           }
//         }

//         // If no specific section mentioned, try to find partial matches
//         if (!sectionToChange) {
//           for (const section in document) {
//             const words = section.toLowerCase().split(" ");
//             for (const word of words) {
//               if (req.includes(word.toLowerCase()) && word.length > 3) {
//                 sectionToChange = section;
//                 break;
//               }
//             }
//             if (sectionToChange) break;
//           }
//         }

//         // Default to Objectives and Goals if no section found
//         if (!sectionToChange) {
//           sectionToChange = "Objectives and Goals";
//         }

//         // Make changes to the selected section
//         const updatedDocument = { ...document };
//         const originalText = document[sectionToChange];

//         // Generate some random changes
//         let newText = generateChanges(originalText);
//         updatedDocument[sectionToChange] = newText;

//         // Update document state
//         setDocument(updatedDocument);
//         setActiveSection(sectionToChange);
//         setDiffSection(sectionToChange);
//         setShowComparison(true);

//         // Add assistant response
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: "assistant",
//             text: `I've updated the content in "${sectionToChange}". You can see the changes in the document viewer.`,
//           },
//         ]);
//       } else {
//         // Generic response for other requests
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: "assistant",
//             text: "I can help you modify document sections. Try asking something like 'Change the content in Objectives and Goals'.",
//           },
//         ]);
//       }
//     }, 500);
//   };

//   const generateChanges = (text) => {
//     // This function creates some random but meaningful changes
//     // For brevity, let's implement a simple modification strategy

//     // Split into paragraphs
//     const paragraphs = text.split("\n\n");

//     if (paragraphs.length > 1) {
//       // Modify a random paragraph
//       const paraToChange = Math.floor(Math.random() * paragraphs.length);
//       const sentences = paragraphs[paraToChange].split(". ");

//       if (sentences.length > 1) {
//         // Remove a sentence
//         const removeIndex = Math.floor(Math.random() * sentences.length);
//         sentences.splice(removeIndex, 1);

//         // Add a new sentence
//         const newSentences = [
//           "This approach ensures compliance with federal regulations and standards.",
//           "Our team has extensive experience implementing similar solutions for government agencies.",
//           "We prioritize security and data integrity throughout the implementation process.",
//           "The proposed timeline allows for thorough testing and validation before deployment.",
//           "Stakeholder feedback will be incorporated at each stage of the project.",
//         ];

//         const addIndex = Math.min(
//           sentences.length,
//           Math.floor(Math.random() * (sentences.length + 1))
//         );
//         sentences.splice(
//           addIndex,
//           0,
//           newSentences[Math.floor(Math.random() * newSentences.length)]
//         );

//         // Reconstruct paragraph
//         paragraphs[paraToChange] = sentences.join(". ");
//       } else {
//         // If only one sentence, append to it
//         paragraphs[paraToChange] +=
//           " Additionally, we will implement industry best practices to ensure maximum efficiency and effectiveness.";
//       }

//       // Combine paragraphs back together
//       return paragraphs.join("\n\n");
//     } else {
//       // If just one paragraph, add a new one
//       return (
//         text +
//         "\n\nFurthermore, our approach emphasizes collaboration with stakeholders to ensure that the final solution meets all requirements and expectations. Regular progress updates and feedback sessions will be scheduled throughout the project lifecycle."
//       );
//     }
//   };

//   const renderDiff = () => {
//     if (!showComparison || !diffSection) return null;

//     const original = originalDocument[diffSection] || "";
//     const updated = document[diffSection] || "";

//     // Basic diff algorithm to highlight changes
//     const originalWords = original.split(/\s+/);
//     const updatedWords = updated.split(/\s+/);

//     // Find common prefix
//     let prefixLength = 0;
//     while (
//       prefixLength < originalWords.length &&
//       prefixLength < updatedWords.length &&
//       originalWords[prefixLength] === updatedWords[prefixLength]
//     ) {
//       prefixLength++;
//     }

//     // Find common suffix
//     let originalSuffix = originalWords.length - 1;
//     let updatedSuffix = updatedWords.length - 1;

//     while (
//       originalSuffix >= prefixLength &&
//       updatedSuffix >= prefixLength &&
//       originalWords[originalSuffix] === updatedWords[updatedSuffix]
//     ) {
//       originalSuffix--;
//       updatedSuffix--;
//     }

//     // Create output
//     const highlightedOriginal = [];
//     const highlightedUpdated = [];

//     // Add prefix
//     for (let i = 0; i < prefixLength; i++) {
//       highlightedOriginal.push(
//         <span key={`o-pre-${i}`}>{originalWords[i]} </span>
//       );
//       highlightedUpdated.push(
//         <span key={`u-pre-${i}`}>{updatedWords[i]} </span>
//       );
//     }

//     // Add changed middle part
//     for (let i = prefixLength; i <= originalSuffix; i++) {
//       highlightedOriginal.push(
//         <span key={`o-mid-${i}`} className={styles.removed}>
//           {originalWords[i]}{" "}
//         </span>
//       );
//     }

//     for (let i = prefixLength; i <= updatedSuffix; i++) {
//       highlightedUpdated.push(
//         <span key={`u-mid-${i}`} className={styles.added}>
//           {updatedWords[i]}{" "}
//         </span>
//       );
//     }

//     // Add suffix
//     for (let i = originalSuffix + 1; i < originalWords.length; i++) {
//       highlightedOriginal.push(
//         <span key={`o-suf-${i}`}>{originalWords[i]} </span>
//       );
//     }

//     for (let i = updatedSuffix + 1; i < updatedWords.length; i++) {
//       highlightedUpdated.push(
//         <span key={`u-suf-${i}`}>{updatedWords[i]} </span>
//       );
//     }

//     return (
//       <div className={styles.diffView}>
//         <div className={styles.diffPanel}>
//           <h3>Original Version</h3>
//           <div className={styles.diffContent}>{highlightedOriginal}</div>
//         </div>
//         <div className={styles.diffPanel}>
//           <h3>Updated Version</h3>
//           <div className={styles.diffContent}>{highlightedUpdated}</div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.sidebar}>
//         <div className={styles.chat}>
//           <div className={styles.chatHeader}>
//             <h2>Document Assistant</h2>
//           </div>
//           <div className={styles.messages}>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`${styles.message} ${
//                   message.sender === "user"
//                     ? styles.userMessage
//                     : styles.assistantMessage
//                 }`}
//               >
//                 {message.text}
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//           <form onSubmit={handleSendMessage} className={styles.inputContainer}>
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={handleInputChange}
//               placeholder="Enter prompt here"
//               className={styles.input}
//             />
//             <button type="submit" className={styles.sendButton}>
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="22" y1="2" x2="11" y2="13"></line>
//                 <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//               </svg>
//             </button>
//           </form>
//         </div>
//         <div className={styles.actionButtons}>
//           <button className={styles.actionButton}>
//             List the resources in this project
//           </button>
//           <button className={styles.actionButton}>Change the milestones</button>
//         </div>
//       </div>

//       <div className={styles.documentViewer}>
//         <h1>Document Viewer</h1>

//         {showComparison && diffSection ? (
//           <>
//             <h2>{diffSection} (Changes Detected)</h2>
//             {renderDiff()}
//             <button
//               className={styles.closeButton}
//               onClick={() => setShowComparison(false)}
//             >
//               Close Comparison
//             </button>
//           </>
//         ) : (
//           <>
//             <div className={styles.sectionList}>
//               {Object.keys(document).map((section) => (
//                 <div
//                   key={section}
//                   className={`${styles.sectionItem} ${
//                     activeSection === section ? styles.activeSection : ""
//                   }`}
//                   onClick={() => setActiveSection(section)}
//                 >
//                   {section}
//                 </div>
//               ))}
//             </div>

//             <div className={styles.sectionContent}>
//               <h2>{activeSection}</h2>
//               <div className={styles.contentText}>
//                 {document[activeSection].split("\n\n").map((paragraph, i) => (
//                   <p key={i}>{paragraph}</p>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CompareParaWithChatInterface;

import React, { useState, useRef, useEffect } from "react";
import styles from "./CompareParaWithChatInterface-ai.module.css";

function CompareParaWithChatInterface() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [document, setDocument] = useState({
    "Executive Summary":
      "Our executive summary provides an overview of the project's key objectives and goals.",
    "Project Overview": `Sakesh Solutions LLC is poised to deliver a transformative technology services project for the Defense Logistics Agency (DLA) under the J6 Enterprise Technology Services (JETS) 2.0 initiative. Our approach is meticulously designed to enhance and modernize the technological capabilities of the DLA, ensuring alignment with the agency's evolving needs.

Our project roadmap is structured to provide comprehensive support across various phases, leveraging our extensive experience in software development, IT consulting, and system integration. Key tasks include the development of a robust performance measurement system, integration of risk management frameworks, and the implementation of agile practices to ensure flexibility and responsiveness.

We have assembled a dedicated team of experts, including technical leads, project managers, and quality assurance specialists, to execute tasks such as updating service credentials, conducting risk assessments, and implementing quality management systems. This team is committed to delivering high-quality documentation and ensuring the adequacy of all project deliverables.

Our technical approach is grounded in the use of advanced technologies to optimize operational frameworks and manage resources effectively. By focusing on critical analysis and adherence to personnel and privacy requirements, we aim to deliver impactful and sustainable technology services that enhance the operational efficiency of the DLA.

With a clear timeline and a detailed breakdown of tasks, Sakesh Solutions LLC is committed to achieving the objectives of the JETS 2.0 project, ensuring that the DLA's technological infrastructure is robust, secure, and future-ready.`,
    "Objectives and Goals": `The primary objective of this project is to enhance the DLA's technological capabilities through the implementation of innovative solutions and frameworks.

Our goals include:
1. Modernizing legacy systems to improve operational efficiency
2. Implementing robust security measures to protect sensitive data
3. Developing scalable solutions that can adapt to evolving requirements
4. Providing comprehensive training to ensure user adoption and success`,
    "Technical Approach": `Our technical approach leverages industry-leading methodologies and tools to deliver high-quality solutions.

We will utilize a combination of agile and waterfall methodologies, tailored to the specific requirements of each project phase. This hybrid approach allows us to maintain flexibility while ensuring that critical milestones are met within the established timeline.`,
    "Implementation Strategy":
      "Our implementation strategy focuses on minimizing disruption to ongoing operations while maximizing the impact of technology improvements.",
    "Risk Management":
      "We have developed a comprehensive risk management framework to identify, assess, and mitigate potential risks throughout the project lifecycle.",
    "Verify Eligibility Criteria Compliance in India": `Sakesh LLC is fully compliant with the eligibility criteria outlined in the RFP for Cybersecurity Support Services and BPA Structure for RFP 20343023R00002 issued by the CPFB. Our extensive experience in the cybersecurity industry positions us as a qualified candidate to meet the specific needs of the CPFB.

Our project roadmap includes key tasks that align with the requirements of the RFP, ensuring that we provide comprehensive cybersecurity support services. For instance, our Government Collaboration and Compliance task focuses on engaging with government-led teams to develop necessary documentation and presentations, ensuring compliance with cybersecurity requirements while facilitating external reporting. This task is crucial for maintaining adherence to specific standards and regulations. With deep expertise in the cybersecurity sector, we are well-equipped to meet the specific needs of the CPFB. Our project roadmap is strategically aligned with the RFP requirements, ensuring the delivery of robust and comprehensive cybersecurity support services. For example, our Government Collaboration and Compliance task is dedicated to partnering with government teams to develop required documentation and presentations—supporting both cybersecurity compliance and external reporting. This work is essential to maintaining alignment with federal standards and regulatory obligations.

Additionally, our Project Management Oversight task emphasizes the management of all active tasks under the contract, fostering direct communication and liaison with the Chief Information Security Officer (CISO) and leadership to ensure ongoing eligibility compliance.`,
  });

  const [originalDocument, setOriginalDocument] = useState({});
  const [activeSection, setActiveSection] = useState(
    "Verify Eligibility Criteria Compliance in India"
  );
  const [editHistory, setEditHistory] = useState({});

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Save original document
    setOriginalDocument({ ...document });
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: inputMessage }]);

    // Process request
    processUserRequest(inputMessage);

    // Clear input
    setInputMessage("");
  };

  const processUserRequest = (request) => {
    const req = request.toLowerCase();

    setTimeout(() => {
      // Check if request is to change content
      if (req.includes("change") && req.includes("content")) {
        let sectionToChange = "";

        // Identify which section to change
        for (const section in document) {
          if (req.includes(section.toLowerCase())) {
            sectionToChange = section;
            break;
          }
        }

        // If no specific section mentioned, try to find partial matches
        if (!sectionToChange) {
          for (const section in document) {
            const words = section.toLowerCase().split(" ");
            for (const word of words) {
              if (req.includes(word.toLowerCase()) && word.length > 3) {
                sectionToChange = section;
                break;
              }
            }
            if (sectionToChange) break;
          }
        }

        // Default to active section if no section found
        if (!sectionToChange) {
          sectionToChange = activeSection;
        }

        // Make changes to the selected section
        const originalText = document[sectionToChange];

        // Get changes
        const { deletedText, addedText, resultText } =
          generateChanges(originalText);

        // Track the changes in history
        setEditHistory((prev) => ({
          ...prev,
          [sectionToChange]: {
            original: originalText,
            deleted: deletedText,
            added: addedText,
            result: resultText,
          },
        }));

        // Update document with result text
        const updatedDocument = { ...document };
        updatedDocument[sectionToChange] = resultText;
        setDocument(updatedDocument);

        // Set active section
        setActiveSection(sectionToChange);

        // Add assistant response
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: `I've updated the content in "${sectionToChange}". You can see the changes highlighted in the document.`,
          },
        ]);
      } else {
        // Generic response for other requests
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: "I can help you modify document sections. Try asking something like 'Change the content in Verify Eligibility Criteria Compliance in India'.",
          },
        ]);
      }
    }, 500);
  };

  const generateChanges = (text) => {
    // Split into paragraphs
    const paragraphs = text.split("\n\n");

    let deletedText = [];
    let addedText = [];
    let resultParagraphs = [...paragraphs];

    if (paragraphs.length > 1) {
      // Choose a paragraph to modify
      const paraToChange = Math.floor(Math.random() * paragraphs.length);
      const sentences = paragraphs[paraToChange].split(". ");

      if (sentences.length > 1) {
        // Remove a sentence
        const removeIndex = Math.floor(Math.random() * sentences.length);
        deletedText.push(sentences[removeIndex]);
        sentences.splice(removeIndex, 1);

        // Add a new sentence
        const newSentences = [
          "This approach ensures compliance with federal regulations and standards",
          "Our team has extensive experience implementing similar solutions for government agencies",
          "We prioritize security and data integrity throughout the implementation process",
          "The proposed timeline allows for thorough testing and validation before deployment",
          "Stakeholder feedback will be incorporated at each stage of the project",
        ];

        const addedSentence =
          newSentences[Math.floor(Math.random() * newSentences.length)];
        addedText.push(addedSentence);

        const addIndex = Math.min(
          sentences.length,
          Math.floor(Math.random() * (sentences.length + 1))
        );
        sentences.splice(addIndex, 0, addedSentence);

        // Update the paragraph
        resultParagraphs[paraToChange] = sentences.join(". ");
      } else {
        // If only one sentence, replace part of it
        const words = paragraphs[paraToChange].split(" ");
        const startIdx = Math.floor(words.length / 3);
        const endIdx = Math.floor((words.length * 2) / 3);

        // Store deleted text
        deletedText.push(words.slice(startIdx, endIdx).join(" "));

        // Create new text
        const newText =
          "efficiently implement innovative solutions that address key requirements";
        addedText.push(newText);

        // Replace words
        words.splice(startIdx, endIdx - startIdx, newText);
        resultParagraphs[paraToChange] = words.join(" ");
      }
    } else {
      // If just one paragraph, add a new one
      const newParagraph =
        "Furthermore, our approach emphasizes collaboration with stakeholders to ensure that the final solution meets all requirements and expectations. Regular progress updates and feedback sessions will be scheduled throughout the project lifecycle.";
      addedText.push(newParagraph);
      resultParagraphs.push(newParagraph);
    }

    return {
      deletedText,
      addedText,
      resultText: resultParagraphs.join("\n\n"),
    };
  };

  const renderSectionContent = () => {
    const content = document[activeSection];
    const history = editHistory[activeSection];

    if (!history) {
      // No edits, render normal content
      return content
        .split("\n\n")
        .map((paragraph, i) => <p key={i}>{paragraph}</p>);
    }

    // Create marked-up HTML with deletions and additions
    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, i) => {
      // Check if this paragraph contains additions
      const hasAddition = history.added.some((added) =>
        paragraph.includes(added)
      );

      if (hasAddition) {
        // Get all additions
        let markedParagraph = paragraph;
        history.added.forEach((added) => {
          markedParagraph = markedParagraph.replace(
            added,
            `<span class="${styles.added}">${added}</span>`
          );
        });

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: markedParagraph }} />
        );
      }

      // Normal paragraph
      return <p key={i}>{paragraph}</p>;
    });
  };

  const renderDeletedContent = () => {
    const history = editHistory[activeSection];

    if (!history || history.deleted.length === 0) {
      return null;
    }

    return history.deleted.map((text, i) => (
      <span key={i} className={styles.removed}>
        {text}.{" "}
      </span>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.chat}>
          <div className={styles.chatHeader}>
            <h2>Document Assistant</h2>
          </div>
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.assistantMessage
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className={styles.inputContainer}>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Enter prompt here"
              className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
        <div className={styles.actionButtons}>
          <button
            className={styles.actionButton}
            onClick={() =>
              handleSendMessage({ preventDefault: () => {}, target: {} })
            }
          >
            List the resources in this project
          </button>
          <button
            className={styles.actionButton}
            onClick={() => {
              setInputMessage(
                "Change the content in Verify Eligibility Criteria Compliance in India"
              );
              setTimeout(
                () =>
                  handleSendMessage({ preventDefault: () => {}, target: {} }),
                100
              );
            }}
          >
            Change the eligibility section
          </button>
        </div>
      </div>

      <div className={styles.documentViewer}>
        <h1>Volume I: Contractual Documents</h1>

        <div className={styles.sectionList}>
          {Object.keys(document).map((section) => (
            <div
              key={section}
              className={`${styles.sectionItem} ${
                activeSection === section ? styles.activeSection : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </div>
          ))}
        </div>

        <div className={styles.sectionContent}>
          <h2>{activeSection}</h2>

          {editHistory[activeSection] &&
            editHistory[activeSection].deleted.length > 0 && (
              <div className={styles.deletedContent}>
                <p>{renderDeletedContent()}</p>
              </div>
            )}

          <div className={styles.contentText}>{renderSectionContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default CompareParaWithChatInterface;
