import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./ReactPerformanceDashboardDemo.css";

// Performance helpers from the React optimization playbook:
// useMemo preserves complex calculations, useCallback preserves handler identity,
// React.memo prevents pure row components from re-rendering when props are unchanged,
// and virtualization limits the DOM rows created for large metric streams.

const metricNames = [
  "ALPHA_LATENCY",
  "BETA_REVENUE",
  "DELTA_STREAM",
  "ORBIT_CPU",
  "VECTOR_IO",
  "PIXEL_LATENCY",
  "KILO_DATA",
  "NULL_STREAM",
  "OMEGA_EVENTS",
  "SIGMA_CACHE",
];

function createMetrics(total = 80) {
  return Array.from({ length: total }, (_, index) => {
    const baseValue = 120 + (index % 12) * 32 + Math.round(Math.random() * 80);

    return {
      id: `M-${index}-${metricNames[index % metricNames.length]}`,
      name: `${metricNames[index % metricNames.length]}-${index}`,
      value: baseValue,
      status:
        index % 4 === 0 ? "warning" : index % 5 === 0 ? "critical" : "healthy",
      streamRate: 50 + index * 2,
      delta: index % 3 === 0 ? -1.8 : 2.7,
    };
  });
}

// Pure presentational rows are wrapped with React.memo.
// The custom comparator intentionally checks only stable, relevant fields.
const MetricRow = memo(
  function MetricRow({ metric, selected, onSelect }) {
    return (
      <div
        className={`metric-row ${selected ? "metric-row--selected" : ""}`}
        onClick={() => onSelect(metric.id)}
      >
        <div className="metric-row__left">
          <span className="metric-row__status metric-row__status--${metric.status}"></span>
          <span className="metric-row__name">{metric.name}</span>
        </div>
        <div className="metric-row__right">
          <span className="metric-row__value">{Math.round(metric.value)}</span>
          <span
            className={`metric-row__delta metric-row__delta--${metric.status}`}
          >
            {metric.delta}%
          </span>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.selected === nextProps.selected &&
      prevProps.metric.id === nextProps.metric.id &&
      prevProps.metric.name === nextProps.metric.name &&
      prevProps.metric.value === nextProps.metric.value &&
      prevProps.metric.status === nextProps.metric.status &&
      prevProps.metric.delta === nextProps.metric.delta
    );
  },
);

function ReactPerformanceDashboardDemo() {
  // State is colocated in the dashboard root so metric cells keep a narrow state surface.
  const [metrics, setMetrics] = useState(() => createMetrics(90));
  const [selectedMetricId, setSelectedMetricId] = useState("M-0-ALPHA_LATENCY");
  const [scrollTop, setScrollTop] = useState(0);

  // useCallback preserves handler identity for the memoized metric row component.
  const onSelectMetric = useCallback((metricId) => {
    setSelectedMetricId(metricId);
  }, []);

  // useEffect simulates a high-frequency WebSocket update stream.
  // It mutates the metrics array in an isolated state update rather than the parent tree.
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((currentMetrics) =>
        currentMetrics.map((metric, index) => {
          const noise = Math.round(Math.random() * 60 - 24);
          const nextValue = Math.max(50, metric.value + noise + (index % 3));

          return {
            ...metric,
            value: nextValue,
            delta: metric.delta + noise / 18,
            status:
              nextValue > 380
                ? "critical"
                : nextValue > 280
                  ? "warning"
                  : "healthy",
          };
        }),
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Aggregation is memoized because computing totals from thousands of metrics repeatedly
  // is expensive and should not happen on every render of the dashboard.
  const dashboardSummary = useMemo(() => {
    const total = metrics.length;
    const average =
      metrics.reduce((acc, metric) => acc + metric.value, 0) /
      Math.max(total, 1);
    const healthyCount = metrics.filter(
      (metric) => metric.status === "healthy",
    ).length;
    const maxValue = Math.max(...metrics.map((metric) => metric.value));

    return { total, average, healthyCount, maxValue };
  }, [metrics]);

  // Virtualization window: only 12 rows are rendered in the current viewport slice.
  // The scroll top controls the row offset, keeping UI memory usage constant.
  const rowHeight = 50;
  const viewportSize = 12;
  const startIndex = Math.min(
    Math.floor(scrollTop / rowHeight),
    Math.max(metrics.length - viewportSize, 0),
  );
  const visibleMetrics = metrics.slice(startIndex, startIndex + viewportSize);

  const selectedMetric = useMemo(() => {
    return (
      metrics.find((metric) => metric.id === selectedMetricId) ?? metrics[0]
    );
  }, [metrics, selectedMetricId]);

  return (
    <section className="performance-demo">
      <div className="performance-demo__top">
        <div>
          <span className="performance-demo__kicker">
            React Performance Optimization
          </span>
          <h1>Realtime Dashboard Engine</h1>
        </div>
        <div className="performance-demo__stats">
          <div className="stat-card">
            <span className="stat-card__label">Live Metrics</span>
            <span className="stat-card__value">{dashboardSummary.total}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Avg Value</span>
            <span className="stat-card__value">
              {Math.round(dashboardSummary.average)}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Healthy</span>
            <span className="stat-card__value">
              {dashboardSummary.healthyCount}
            </span>
          </div>
        </div>
      </div>

      <section className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <div className="sidebar-card">
            <span className="sidebar-card__label">Route</span>
            <span className="sidebar-card__value">metrics.live</span>
          </div>
          <div className="sidebar-card">
            <span className="sidebar-card__label">Throughput</span>
            <span className="sidebar-card__value">50Hz</span>
          </div>
          <div className="sidebar-card">
            <span className="sidebar-card__label">Max Value</span>
            <span className="sidebar-card__value">
              {Math.round(dashboardSummary.maxValue)}
            </span>
          </div>
        </aside>

        <section className="dashboard-board">
          <div className="dashboard-board__header">
            <div>
              <span className="dashboard-board__label">Stream Window</span>
              <h2>Live Telemetry</h2>
            </div>
            <div className="dashboard-board__actions">
              <button className="micro-button" type="button">
                Pulse
              </button>
              <button
                className="micro-button micro-button--active"
                type="button"
              >
                Auto refresh
              </button>
            </div>
          </div>

          <div className="metric-list-wrapper">
            <div
              className="metric-list"
              onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
            >
              {visibleMetrics.map((metric) => (
                <MetricRow
                  key={metric.id}
                  metric={metric}
                  selected={selectedMetric.id === metric.id}
                  onSelect={onSelectMetric}
                />
              ))}
            </div>
          </div>
        </section>

        <aside className="dashboard-detail">
          <div className="detail-card">
            <span className="detail-card__label">Selected metric</span>
            <h3>{selectedMetric.name}</h3>
            <div className="detail-card__value">
              {Math.round(selectedMetric.value)}
            </div>
            <div className="detail-card__grid">
              <div>
                <span className="detail-card__mini-label">Status</span>
                <span className="detail-card__mini-value">
                  {selectedMetric.status}
                </span>
              </div>
              <div>
                <span className="detail-card__mini-label">Rate</span>
                <span className="detail-card__mini-value">
                  {selectedMetric.streamRate}Hz
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </section>
  );
}

export default ReactPerformanceDashboardDemo;
