/**
 * Searching catalog chunk (beginner-level).
 * Real-world focused summaries and use cases.
 */
const searching = {
  id: "searching",
  title: "Searching",
  level: "Beginner",
  algorithms: [
    {
      id: "binary-search",
      name: "Binary Search",
      summary:
        "Divide search space in half on sorted data or monotonic answer space to locate targets efficiently.",
      useCases: [
        "Pagination cursors and ID ranges in databases",
        "Feature flags / config lookup over ordered rules",
        "Parametric search (minimal feasible value) for capacity and SLA tuning",
      ],
      complexity: { time: "O(log n)", space: "O(1)" },
    },
    {
      id: "lower-upper-bound",
      name: "Lower/Upper Bound",
      summary:
        "Find first/last position satisfying a predicate in sorted data; binary search variant for ranges.",
      useCases: [
        "Time-series window boundaries (first event after T)",
        "Analytics percentiles over sorted metrics",
        "Range scans in storage engines and inverted indexes",
      ],
      complexity: { time: "O(log n)", space: "O(1)" },
    },
    {
      id: "two-pointers",
      name: "Two Pointers",
      summary:
        "Coordinate two indices to shrink/expand windows or converge from both ends, keeping passes linear.",
      useCases: [
        "Deduplicating sorted arrays/streams",
        "Merging intervals and calendars",
        "Container With Most Water / max area problems",
      ],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    {
      id: "ternary-search",
      name: "Ternary Search (Unimodal)",
      summary:
        "Search a unimodal function/array for minimum/maximum by shrinking thirds each step.",
      useCases: [
        "Tuning a single hyperparameter over a convex error curve",
        "Finding optimal split points in cost curves",
        "Peak finding in telemetry with unimodal segments",
      ],
      complexity: { time: "O(log n)", space: "O(1)" },
    },
    {
      id: "jump-search",
      name: "Jump / Exponential Search",
      summary:
        "Skip ahead by blocks (or exponential growth) to find the window, then binary search inside.",
      useCases: [
        "Searching paged storage or block-based files",
        "Bounded lookup on partially known positions (e.g., log offsets)",
        "Latency-sensitive approximate positioning before refinement",
      ],
      complexity: { time: "O(√n) jump, O(log n) inside", space: "O(1)" },
    },
  ],
};

export default searching;
