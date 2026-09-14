import React, {
  Suspense,
  startTransition,
  useMemo,
  useState,
  useTransition,
} from "react";
import "./UseTransitionDemo.css";

// React 18+ useTransition marks a non-urgent UI update as a transition.
// The urgent input state updates immediately while the heavier filtered result
// computation can be deferred and rendered in the background without freezing input.

const AI_DOCS = Array.from({ length: 5000 }, (_, index) => {
  const names = [
    "Neural atlas",
    "Risk analysis",
    "Legal vector",
    "Pricing engine",
    "Search memory",
    "Health scanner",
    "Risk ontology",
    "Audit corpus",
  ];

  return {
    id: index + 1,
    title: `${names[index % names.length]} document ${index + 1}`,
    category: ["AI", "Risk", "Policy", "Systems"][index % 4],
    score: 90 + (index % 16),
  };
});

function expensiveFilter(query, allDocs) {
  // Simulate a CPU-heavy filtering task over a large embedding corpus.
  //   const lowerQuery = query.toLowerCase();
  //   const filtered = allDocs.filter((doc) => {
  //     return (
  //       doc.title.toLowerCase().includes(lowerQuery) ||
  //       doc.category.toLowerCase().includes(lowerQuery)
  //     );
  //   });

  //   return filtered;

  // simulate a CPU-heavy filtering task over a large embedding corpus.
  const lowerQuery = query.toLowerCase();
  const filtered = allDocs.filter((doc) => {
    return (
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.category.toLowerCase().includes(lowerQuery)
    );
  });

  // Simulate a delay to mimic heavy computation
  const start = Date.now();
  while (Date.now() - start < 50) {
    // Busy wait for 50ms
    // This simulates a CPU-heavy computation
  }

  return filtered;
}

function UseTransitionDemo() {
  // Urgent state: this must update at keypress speed so typing never feels delayed.
  const [searchValue, setSearchValue] = useState("");

  // Transition state: the heavy filtered result is derived through the transition.
  const [filterValue, setFilterValue] = useState("");
  const [isPending, startTransition] = useTransition();

  // useMemo is used to keep the expensive filtering work isolated from unrelated UI churn.
  const filteredDocs = useMemo(() => {
    return expensiveFilter(filterValue, AI_DOCS);
  }, [filterValue]);

  function handleTyping(event) {
    const nextValue = event.target.value;

    // Urgent update: the input value must be rendered immediately.
    setSearchValue(nextValue);

    // Non-urgent transition update: does heavy filtering in a background render.
    startTransition(() => {
      setFilterValue(nextValue);
    });
  }

  return (
    <section className="transition-demo">
      <div className="transition-demo__intro">
        <div>
          <span className="transition-demo__kicker">
            React 18+ useTransition
          </span>
          <h1>Concurrent Search</h1>
        </div>
        <div className="transition-demo__status">
          <span
            className={`status-light ${isPending ? "status-light--active" : ""}`}
          ></span>
          {isPending ? "Filtering" : "Ready"}
        </div>
      </div>

      <section className="transition-demo__panel">
        <div className="transition-demo__toolbar">
          <div className="search-box">
            <label className="search-box__label">Search corpus</label>
            <input
              className="search-input"
              value={searchValue}
              onChange={handleTyping}
              placeholder="Search AI docs"
            />
          </div>
          <div className="transition-demo__meta">
            <span className="meta-label">Indexed docs</span>
            <span className="meta-value">{AI_DOCS.length}</span>
          </div>
          <div className="transition-demo__meta">
            <span className="meta-label">Visible results</span>
            <span className="meta-value">{filteredDocs.length}</span>
          </div>
        </div>

        <div className="transition-demo__results">
          <div className="results-header">
            <span className="results-header__label">Embedding results</span>
            <span className="results-header__chip">
              {filterValue ? `Query: ${filterValue}` : "All documents"}
            </span>
          </div>

          <div className="results-list">
            <Suspense
              fallback={<div className="loading-row">Streaming results...</div>}
            >
              {filteredDocs.slice(0, 50).map((doc) => (
                <div className="result-row" key={doc.id}>
                  <span className="result-row__title">{doc.title}</span>
                  <span className="result-row__meta">
                    <span>{doc.category}</span>
                    <span>{doc.score}</span>
                  </span>
                </div>
              ))}
            </Suspense>
          </div>
        </div>
      </section>
    </section>
  );
}

export default UseTransitionDemo;
