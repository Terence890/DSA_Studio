/**
 * Sorting catalog chunk (beginner → intermediate).
 * Real-world focused summaries and use cases.
 */
const sorting = {
  id: "sorting",
  title: "Sorting",
  level: "Beginner → Intermediate",
  algorithms: [
    {
      id: "merge-sort",
      name: "Merge Sort",
      summary:
        "Divide and conquer with stable merges; predictable n log n even on adverse inputs.",
      useCases: [
        "External sorting on large datasets / files",
        "Stable ordering for payments, ledgers, and financial records",
        "Pre-step for binary searching grouped or partitioned data",
      ],
      complexity: { time: "O(n log n)", space: "O(n)" },
    },
    {
      id: "quick-sort",
      name: "Quick Sort",
      summary:
        "Partition-based; fast average with good pivots; in-place with small constant factors.",
      useCases: [
        "In-memory lists and caches where average speed matters",
        "Ordering leaderboard or feed data",
        "Partition steps inside quickselect (kth order stats)",
      ],
      complexity: { time: "O(n log n) avg, O(n²) worst", space: "O(log n)" },
    },
    {
      id: "heap-sort",
      name: "Heap Sort",
      summary:
        "Binary heap for in-place n log n with consistent worst-case bounds; not stable.",
      useCases: [
        "Predictable latency sorting when worst-case must be bounded",
        "Follow-up after heap-based top-k extraction",
        "Memory-constrained environments that need in-place guarantees",
      ],
      complexity: { time: "O(n log n)", space: "O(1)" },
    },
    {
      id: "insertion-sort",
      name: "Insertion Sort",
      summary:
        "Builds a sorted prefix; excellent for tiny or nearly sorted inputs and adaptive hybrids.",
      useCases: [
        "Small arrays or tail recursion bases in hybrid sorts (e.g., Timsort)",
        "Nearly sorted logs or event streams",
        "Hot code paths favoring low constant factors on micro-batches",
      ],
      complexity: { time: "O(n²) avg/worst, O(n) best", space: "O(1)" },
    },
    {
      id: "counting-radix-sort",
      name: "Counting / Radix Sort",
      summary:
        "Bucket by digit/key within bounded domain to achieve linear-like behavior.",
      useCases: [
        "Sorting telemetry/user IDs with small bounded keyspace",
        "String/byte array sorting via LSD/MSD radix passes",
        "Pipeline preprocessing before aggregation or grouping",
      ],
      complexity: { time: "O(n + k)", space: "O(n + k)" },
    },
    {
      id: "selection-sort",
      name: "Selection Sort",
      summary:
        "Simple n² with minimal swaps; educational and rarely chosen for production.",
      useCases: [
        "Pedagogical comparison against better algorithms",
        "Extremely constrained swap scenarios (still uncommon)",
      ],
      complexity: { time: "O(n²)", space: "O(1)" },
    },
    {
      id: "timsort",
      name: "Timsort",
      summary:
        "Hybrid of runs + merge + insertion; exploits existing order (natural runs) for real-world data.",
      useCases: [
        "General-purpose stable sort in Python/Java runtimes",
        "User-facing lists where partial order is common",
        "Systems needing stability plus strong real-world performance",
      ],
      complexity: { time: "O(n log n) avg/worst, O(n) best on runs", space: "O(n)" },
    },
  ],
};

export default sorting;
