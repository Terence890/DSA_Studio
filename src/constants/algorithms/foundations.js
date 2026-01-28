/**
 * Foundations catalog chunk (beginner-level).
 * Real-world focused summaries and use cases.
 */
const foundations = {
  id: "foundations",
  title: "Foundations",
  level: "Beginner",
  algorithms: [
    {
      id: "big-o",
      name: "Big-O Analysis",
      summary:
        "Characterize time/space growth to compare alternatives, predict scale behavior, and spot bottlenecks.",
      useCases: [
        "Capacity planning for backend services and data pipelines",
        "Choosing data structures in feature design (hash map vs tree vs array)",
        "Communicating tradeoffs and SLAs to stakeholders",
      ],
      complexity: { time: "Varies", space: "Varies" },
    },
    {
      id: "prefix-sum",
      name: "Prefix Sum",
      summary:
        "Precompute cumulative aggregates so range queries resolve in O(1) after O(n) prep.",
      useCases: [
        "Analytics dashboards and rolling totals over time windows",
        "Image processing (integral images) and heatmaps",
        "Gaming: cumulative damage/score ranges and loot distribution",
      ],
      complexity: { time: "Build O(n), Query O(1)", space: "O(n)" },
    },
    {
      id: "sliding-window",
      name: "Sliding Window",
      summary:
        "Maintain a moving window with counts/sets to keep scans linear instead of quadratic.",
      useCases: [
        "Rate limiting and observability over recent intervals",
        "Log/telemetry analysis (unique users or errors per window)",
        "Strings/subarrays (longest substring without repeat, min window)",
      ],
      complexity: { time: "O(n)", space: "O(k)" },
    },
  ],
};

export default foundations;
