/**
 * Dynamic Programming catalog chunk (advanced level).
 * Real-world focused summaries and use cases.
 */
const dp = {
  id: "dp",
  title: "Dynamic Programming",
  level: "Advanced",
  algorithms: [
    {
      id: "knapsack",
      name: "0/1 Knapsack",
      summary:
        "Optimize total value under capacity by exploring include/exclude states via memoization/tabulation.",
      useCases: [
        "Budgeting and portfolio subset selection",
        "Resource allocation in schedulers and capacity planning",
        "Feature prioritization under cost limits",
      ],
      complexity: { time: "O(n·W)", space: "O(n·W) or O(W)" },
    },
    {
      id: "lis",
      name: "Longest Increasing Subsequence (LIS)",
      summary:
        "Track minimal tail values with binary search (patience sorting) to build increasing subsequences efficiently.",
      useCases: [
        "Versioning and dependency chain analysis",
        "Stock/metric trend analysis over time",
        "Sequence harmonization and diff/merge tools",
      ],
      complexity: { time: "O(n log n)", space: "O(n)" },
    },
    {
      id: "edit-distance",
      name: "Edit Distance (Levenshtein)",
      summary:
        "Compute minimal insert/delete/replace operations between strings using 2D DP over prefixes.",
      useCases: [
        "Spell-check and fuzzy search/autocomplete",
        "DNA/protein sequence alignment in bioinformatics",
        "Diffing text/code for patches and merge tools",
      ],
      complexity: { time: "O(m·n)", space: "O(m·n) or O(min(m,n))" },
    },
    {
      id: "matrix-dp",
      name: "Grid Path / Matrix DP",
      summary:
        "Solve path, count, and min-cost problems on grids with state transitions from neighbors.",
      useCases: [
        "Pathfinding on weighted grids (logistics, games)",
        "Image/heatmap cumulative cost analysis",
        "Robot movement with obstacles and energy constraints",
      ],
      complexity: { time: "O(m·n)", space: "O(m·n) or O(min(m,n))" },
    },
    {
      id: "bitmask-dp",
      name: "Bitmask DP on Subsets",
      summary:
        "Enumerate subsets with memoization for traveling-like problems or state compression.",
      useCases: [
        "Traveling salesman on small N (routing micro-fleets)",
        "Optimal team/asset assignment with exclusivity",
        "Game states with limited actors (puzzles, board searches)",
      ],
      complexity: { time: "O(n·2^n)", space: "O(2^n)" },
    },
    {
      id: "interval-dp",
      name: "Interval DP",
      summary:
        "Optimize over segments by splitting intervals; common in merge/partition/cut problems.",
      useCases: [
        "Optimal BST construction",
        "Matrix chain multiplication and polygon triangulation",
        "File/chunk merge cost minimization",
      ],
      complexity: { time: "O(n^3) typical", space: "O(n^2)" },
    },
  ],
};

export default dp;
