import React, { useRef, useState } from "react";
import "./ControlledUncontrolledInputDemo.css";

// Controlled inputs store the source of truth inside React state.
// Uncontrolled inputs keep the source of truth in the DOM node itself,
// while useRef gives React a stable mutable object reference.

function ControlledUncontrolledInputDemo() {
  // Controlled example: the value is held in React state for instant validation,
  // conditional fields, formatting, and rich UI feedback.
  const [controlledName, setControlledName] = useState("");
  const [controlledEmail, setControlledEmail] = useState("");

  // Uncontrolled example: useRef points to the DOM input node instead of a React state slice.
  // React does not re-render when the property value changes inside the ref object.
  const uncontrolledNameRef = useRef(null);
  const uncontrolledEmailRef = useRef(null);

  // showControlled is the same example of state-locked UI that drives immediate render feedback.
  const controlledFieldsValid =
    controlledName.trim().length > 1 && controlledEmail.includes("@");

  function handleControlledSubmit(event) {
    event.preventDefault();
    alert(`Controlled form submitted: ${controlledName} / ${controlledEmail}`);
  }

  function handleUncontrolledSubmit(event) {
    event.preventDefault();

    const values = {
      name: uncontrolledNameRef.current?.value ?? "",
      email: uncontrolledEmailRef.current?.value ?? "",
    };

    alert(`Uncontrolled form submitted: ${values.name} / ${values.email}`);
  }

  return (
    <section className="controlled-demo">
      <div className="controlled-demo__intro">
        <div>
          <span className="controlled-demo__kicker">
            Controlled vs Uncontrolled
          </span>
          <h1>Input Architecture</h1>
        </div>
        <div className="controlled-demo__badge">
          <span className="controlled-demo__badge-dot"></span>
          100+ field intake
        </div>
      </div>

      <section className="controlled-demo__grid">
        <article className="input-panel input-panel--controlled">
          <div className="input-panel__header">
            <span className="input-panel__label">Controlled Inputs</span>
            <span className="input-panel__tag">React state</span>
          </div>

          <form className="input-form" onSubmit={handleControlledSubmit}>
            <label className="input-row">
              <span className="input-row__label">Name</span>
              <input
                className="text-input"
                value={controlledName}
                onChange={(event) => setControlledName(event.target.value)}
                placeholder="Full name"
              />
            </label>

            <label className="input-row">
              <span className="input-row__label">Email</span>
              <input
                className="text-input"
                value={controlledEmail}
                onChange={(event) => setControlledEmail(event.target.value)}
                placeholder="name@company.com"
              />
            </label>

            <div className="input-form__validation">
              <span
                className={`validation-chip ${controlledFieldsValid ? "validation-chip--valid" : ""}`}
              >
                {controlledFieldsValid ? "Ready" : "Needs fields"}
              </span>
            </div>

            <button className="primary-button" type="submit">
              Validate controlled form
            </button>
          </form>
        </article>

        <article className="input-panel input-panel--uncontrolled">
          <div className="input-panel__header">
            <span className="input-panel__label">Uncontrolled Inputs</span>
            <span className="input-panel__tag">useRef</span>
          </div>

          <form className="input-form" onSubmit={handleUncontrolledSubmit}>
            <label className="input-row">
              <span className="input-row__label">Name</span>
              <input
                className="text-input"
                ref={uncontrolledNameRef}
                defaultValue=""
                placeholder="Native value"
              />
            </label>

            <label className="input-row">
              <span className="input-row__label">Email</span>
              <input
                className="text-input"
                ref={uncontrolledEmailRef}
                defaultValue=""
                placeholder="name@company.com"
              />
            </label>

            <div className="input-form__validation">
              <span className="validation-chip">Native DOM</span>
            </div>

            <button
              className="primary-button primary-button--dark"
              type="submit"
            >
              Read uncontrolled form
            </button>
          </form>
        </article>
      </section>

      <section className="controlled-demo__architecture">
        <div className="architecture-heading">
          <div>
            <span className="architecture-heading__kicker">
              Performance Strategy
            </span>
            <h2>Use the right source of truth</h2>
          </div>
        </div>

        <div className="architecture-grid">
          <div className="architecture-card">
            <span className="architecture-card__num">01</span>
            <h3>Controlled</h3>
            <p>
              Use when every keypress needs immediate validation, formatting,
              masking, or conditional fields.
            </p>
          </div>
          <div className="architecture-card">
            <span className="architecture-card__num">02</span>
            <h3>Uncontrolled</h3>
            <p>
              Use when you want the browser DOM to own input values and only
              read them at submit or blur.
            </p>
          </div>
          <div className="architecture-card">
            <span className="architecture-card__num">03</span>
            <h3>useRef</h3>
            <p>
              Use for imperative things like DOM nodes, timers, websocket
              handles, canvas contexts, and previous values.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ControlledUncontrolledInputDemo;
