/**
 * Greedy & Scheduling catalog chunk (advanced level).
 * Real-world focused summaries and use cases.
 */
const greedy = {
  id: "greedy",
  title: "Greedy & Scheduling",
  level: "Advanced",
  algorithms: [
    {
      id: "interval-scheduling",
      name: "Interval Scheduling / Activity Selection",
      summary: "Pick the maximum set of non-overlapping intervals by sorting on earliest finish.",
      useCases: [
        "Meeting room / resource allocation",
        "CPU/GPU job scheduling with single machine",
        "Ad slot or campaign scheduling",
      ],
      complexity: { time: "O(n log n)", space: "O(1)" },
    },
    {
      id: "interval-partitioning",
      name: "Interval Partitioning",
      summary: "Assign intervals to the minimum number of resources by sweeping start times with a min-heap on end times.",
      useCases: [
        "Scheduling rooms or tracks for events",
        "Allocating compute instances or shards to non-overlapping jobs",
        "Timeline-based capacity planning",
      ],
      complexity: { time: "O(n log n)", space: "O(n)" },
    },
    {
      id: "kruskal",
      name: "Greedy MST (Kruskal)",
      summary: "Sort edges by weight and union smallest non-cycling edges to build an MST.",
      useCases: [
        "Network and cabling cost minimization",
        "Clustering via single-linkage",
        "Backbone design under budget constraints",
      ],
      complexity: { time: "O(E log V)", space: "O(V)" },
    },
    {
      id: "prim",
      name: "Greedy MST (Prim)",
      summary: "Grow MST from a seed using a priority queue of crossing edges.",
      useCases: [
        "Incrementally expanding network infrastructure",
        "When graph is dense or adjacency priority-queue is convenient",
      ],
      complexity: { time: "O(E log V)", space: "O(V)" },
    },
    {
      id: "huffman",
      name: "Huffman Coding",
      summary: "Optimal prefix-free codes via repeatedly merging two smallest-frequency nodes.",
      useCases: [
        "Compression of text/telemetry payloads",
        "Bandwidth-optimized messaging formats",
        "Custom encoding for domain-specific data",
      ],
      complexity: { time: "O(n log n)", space: "O(n)" },
    },
    {
      id: "coin-change-greedy",
      name: "Coin Change (Greedy on Canonical Systems)",
      summary: "Pick largest denominations first when the coin system is canonical.",
      useCases: [
        "Cash/point redemption with standard denominations",
        "Greedy packing when constraints guarantee optimality",
      ],
      complexity: { time: "O(n)", space: "O(1)" },
      notes: "Not optimal for arbitrary coin systems; verify canonical property.",
    },
    {
      id: "fractional-knapsack",
      name: "Fractional Knapsack",
      summary: "Take items by highest value/weight ratio; fractions allowed yields optimal greedy.",
      useCases: [
        "Bandwidth or storage allocation with divisible assets",
        "Ad budget or resource slicing where partial assignment is valid",
      ],
      complexity: { time: "O(n log n) sort, O(n) select", space: "O(1)" },
    },
    {
      id: "activity-chain",
      name: "Weighted Interval Scheduling (greedy fails)",
      summary: "Demonstrates greedy limitations; needs DP for weighted intervals.",
      useCases: [
        "Showcases when to switch to DP if weights matter",
        "Scheduling revenue-bearing jobs with overlaps",
      ],
      complexity: { time: "Greedy not optimal; DP O(n log n)", space: "O(n)" },
      notes: "Included as a cautionary example to contrast with greedy-friendly cases.",
    },
  ],
};

export default greedy;
