/**
 * Core Data Structures catalog chunk (intermediate level).
 * Real-world focused summaries and use cases.
 */
const dataStructures = {
  id: "data-structures",
  title: "Core Data Structures",
  level: "Intermediate",
  algorithms: [
    {
      id: "hash-map",
      name: "Hash Map",
      summary:
        "Average O(1) insert/lookup using hashing with collision handling (chaining/open addressing).",
      useCases: [
        "Caching (paired with list/heap for LRU/LFU)",
        "Session/token stores and feature flags",
        "Deduplication and frequency counters in data pipelines",
      ],
      complexity: { time: "O(1) avg, O(n) worst", space: "O(n)" },
    },
    {
      id: "linked-list",
      name: "Linked List",
      summary:
        "Pointer-based list enabling O(1) insert/delete at known nodes; variants: singly, doubly, circular.",
      useCases: [
        "LRU cache node list (paired with hash map)",
        "Job/task pipelines and undo/redo buffers",
        "Music/playlist navigation and editors",
      ],
      complexity: { time: "O(1) node insert/delete, O(n) search", space: "O(n)" },
    },
    {
      id: "stack-queue",
      name: "Stack & Queue / Deque",
      summary:
        "Fundamental LIFO/FIFO/bi-ended buffers for traversal, parsing, and scheduling workloads.",
      useCases: [
        "Browser history (stack) and command undo",
        "Task scheduling, BFS layers (queue/deque)",
        "Monotonic stack for next-greater/stock span/window maxima",
      ],
      complexity: { time: "O(1) ops", space: "O(n)" },
    },
    {
      id: "heap",
      name: "Heap / Priority Queue",
      summary:
        "Tree-ordered by priority root; efficient top extraction and key updates with a small memory footprint.",
      useCases: [
        "Dijkstra / A* search frontier and best-first planners",
        "Top-k streaming queries and median maintenance (two-heaps)",
        "Rate limiting and job scheduling with priorities",
      ],
      complexity: { time: "O(log n) push/pop, O(1) peek", space: "O(n)" },
    },
    {
      id: "trie",
      name: "Trie (Prefix Tree)",
      summary:
        "Character-wise branching for fast prefix lookups, autocomplete, and dictionary operations.",
      useCases: [
        "Search-as-you-type suggestions and command palettes",
        "DNS/URL routers and prefix-based routing",
        "Word filtering, spell-check, and tokenizer lexicons",
      ],
      complexity: { time: "O(L)", space: "O(Σ·L)" },
    },
    {
      id: "segment-tree",
      name: "Segment Tree / Fenwick (BIT)",
      summary:
        "Supports range queries and updates in logarithmic time over arrays and grids.",
      useCases: [
        "Real-time dashboards (range sum/min/max)",
        "2D Fenwick for heatmaps and game grids",
        "Leaderboard windows and rolling analytics",
      ],
      complexity: { time: "O(log n) update/query", space: "O(n)" },
    },
    {
      id: "union-find",
      name: "Disjoint Set (Union-Find)",
      summary:
        "Maintains disjoint components with near-constant merges/finds via union by rank + path compression.",
      useCases: [
        "Connected components in graphs",
        "Kruskal's MST construction",
        "Grouping users/resources by cluster/tenant affinity",
      ],
      complexity: { time: "α(n) amortized", space: "O(n)" },
    },
  ],
};

export default dataStructures;
