import React, { useState } from "react";
import "./PropsStateArchitectureDemo.css";

// Props and state are the two main data flows in React.
// Props describe what a child component receives from its parent.
// State describes data that a component owns and updates internally.
const propRows = [
  {
    concept: "Props",
    ownership: "Parent-owned",
    direction: "Parent → child",
    mutation: "Read-only contract",
    primaryUse: "Configure UI",
  },
  {
    concept: "State",
    ownership: "Component-owned",
    direction: "Inside component",
    mutation: "Mutable via setter",
    primaryUse: "Track interaction",
  },
];

// A reusable polymorphic button shows how props can model a scalable API.
// The consumer can choose a native button or an anchor by passing as="button" | "a".
function DemoButton({
  as = "button",
  variant = "primary",
  href = "#",
  children,
  className = "",
  onClick,
}) {
  const variantClass = `demo-button--${variant}`;

  if (as === "a") {
    return (
      <a
        className={`demo-button ${variantClass} ${className}`}
        href={href}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`demo-button ${variantClass} ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Compound component composition: instead of a giant payload of modal props,
// the modal shares layout fragments through nested children.
function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-shell">
      <div className="modal-panel">
        <div className="modal-top">
          <h3>{title}</h3>
          <button className="modal-close" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function ModalHeader({ title }) {
  return <div className="modal-header">{title}</div>;
}

function ModalBody({ children }) {
  return <div className="modal-content">{children}</div>;
}

function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
}

function PropsStateArchitectureDemo() {
  // State lives inside the component and drives the UI lifecycle.
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin");

  // This local search is an example of state used to support component interaction.
  const filteredRows = propRows.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLowerCase().includes(search.toLowerCase()),
    );
  });

  return (
    <section className="props-demo">
      <div className="props-demo__intro">
        <div>
          <h1>Props vs State Architecture</h1>
        </div>
        <div className="props-demo__actions">
          <DemoButton as="a" variant="secondary" href="#props">
            Learn model
          </DemoButton>
          <DemoButton variant="primary" onClick={() => setOpen(true)}>
            Open modal
          </DemoButton>
        </div>
      </div>

      <section className="props-demo__grid">
        <article className="props-demo__panel">
          <div className="panel-title">
            <span className="panel-title__label">Props</span>
            <span className="panel-title__badge">Parent → Child</span>
          </div>
          <div className="panel-content">
            <div className="code-line">
              <span className="code-key">props</span>
              <span className="code-equals">:</span>
              <span className="code-value">Immutable contract</span>
            </div>
            <div className="code-line">
              <span className="code-key">state</span>
              <span className="code-equals">:</span>
              <span className="code-value">Internal, local</span>
            </div>
          </div>
          <div className="panel-list">
            <div className="panel-list__row">
              <span className="panel-list__key">Read-only</span>
              <span className="panel-list__value">true</span>
            </div>
            <div className="panel-list__row">
              <span className="panel-list__key">Rerender trigger</span>
              <span className="panel-list__value">Parent update</span>
            </div>
          </div>
        </article>

        <article className="props-demo__panel">
          <div className="panel-title">
            <span className="panel-title__label">State</span>
            <span className="panel-title__badge">Component-owned</span>
          </div>
          <div className="panel-content">
            <div className="code-line">
              <span className="code-key">useState</span>
              <span className="code-equals">:</span>
              <span className="code-value">Mutable</span>
            </div>
            <div className="code-line">
              <span className="code-key">setState</span>
              <span className="code-equals">:</span>
              <span className="code-value">Re-render</span>
            </div>
          </div>
          <div className="panel-list">
            <div className="panel-list__row">
              <span className="panel-list__key">Owns UI data</span>
              <span className="panel-list__value">yes</span>
            </div>
            <div className="panel-list__row">
              <span className="panel-list__key">Forms / toggles</span>
              <span className="panel-list__value">managed locally</span>
            </div>
          </div>
        </article>
      </section>

      <section className="props-demo__architecture">
        <div className="section-heading">
          <div>
            <span className="section-heading__kicker">
              Architecture Strategy
            </span>
            <h2>Reusable component API</h2>
          </div>
          <div className="search-box">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="search-input"
              placeholder="Search prop model"
            />
          </div>
        </div>

        <div className="strategy-list">
          <div className="strategy-card">
            <span className="strategy-card__num">01</span>
            <div>
              <h3>Prop polymorphism</h3>
              <p>
                Expose a clean API with an element alias such as <code>as</code>{" "}
                and enforce interface consistency.
              </p>
            </div>
          </div>
          <div className="strategy-card">
            <span className="strategy-card__num">02</span>
            <div>
              <h3>Compound components</h3>
              <p>
                Compose a modal from sub-parts instead of a single giant prop
                payload.
              </p>
            </div>
          </div>
          <div className="strategy-card">
            <span className="strategy-card__num">03</span>
            <div>
              <h3>Controlled / uncontrolled inversion</h3>
              <p>
                Let consumers pair <code>value</code> and <code>onChange</code>{" "}
                with <code>defaultValue</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="api-table">
          <div className="api-table__header">
            <span>Concept</span>
            <span>Ownership</span>
            <span>Direction</span>
            <span>Mutation</span>
            <span>Use</span>
          </div>

          {filteredRows.map((row) => (
            <div className="api-table__row" key={row.concept}>
              <span>{row.concept}</span>
              <span>{row.ownership}</span>
              <span>{row.direction}</span>
              <span>{row.mutation}</span>
              <span>{row.primaryUse}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="props-demo__example">
        <div className="section-heading compact">
          <div>
            <span className="section-heading__kicker">Controlled Example</span>
            <h2>Role selector</h2>
          </div>
        </div>

        <div className="role-strip">
          <label className="role-option">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "admin"}
              onChange={() => setSelectedRole("admin")}
            />
            <span>Admin</span>
          </label>
          <label className="role-option">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "editor"}
              onChange={() => setSelectedRole("editor")}
            />
            <span>Editor</span>
          </label>
          <label className="role-option">
            <input
              type="radio"
              name="role"
              checked={selectedRole === "viewer"}
              onChange={() => setSelectedRole("viewer")}
            />
            <span>Viewer</span>
          </label>
        </div>

        <div className="result-card">
          <div className="result-card__label">Selected</div>
          <div className="result-card__role">{selectedRole}</div>
          <div className="result-card__meta">
            <DemoButton as="a" variant="primary" href="#role">
              Continue as {selectedRole}
            </DemoButton>
          </div>
        </div>
      </section>

      <Modal open={open} title="Reusable Modal" onClose={() => setOpen(false)}>
        <ModalHeader title="Design system API" />
        <ModalBody>
          <p>
            Props describe the outside shape. State holds the chosen interaction
            model locally.
          </p>
          <div className="modal-tags">
            <span>as</span>
            <span>value</span>
            <span>defaultValue</span>
            <span>onChange</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <DemoButton variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </DemoButton>
          <DemoButton variant="primary">Save pattern</DemoButton>
        </ModalFooter>
      </Modal>
    </section>
  );
}

export default PropsStateArchitectureDemo;
