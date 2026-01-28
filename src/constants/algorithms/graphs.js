/**
 * Graphs & Traversals catalog chunk (intermediate → advanced).
 * Real-world focused summaries and use cases.
 */
const graphs = {
  id: "graphs",
  title: "Graphs & Traversals",
  level: "Intermediate → Advanced",
  algorithms: [
    {
      id: "bfs-dfs",
      name: "BFS / DFS",
      summary:
        "Traverse graphs for reachability, layering, component detection, and path reconstruction.",
      useCases: [
        "Shortest path in unweighted graphs (BFS)",
        "Dependency resolution and cycle checks (DFS)",
        "Network crawl / social graph expansion"
      ],
      complexity: { time: "O(V + E)", space: "O(V + E)" }
    },
    {
      id: "toposort",
      name: "Topological Sort",
      summary:
        "Linearize a DAG respecting dependencies; Kahn’s algorithm or DFS postorder.",
      useCases: [
        "Build systems / CI pipelines",
        "Course scheduling and prerequisites",
        "Task orchestration in DAG engines"
      ],
      complexity: { time: "O(V + E)", space: "O(V + E)" }
    },
    {
      id: "dijkstra",
      name: "Dijkstra / A*",
      summary:
        "Single-source shortest paths on weighted graphs; A* adds heuristics for guided search.",
      useCases: [
        "Maps routing and navigation",
        "Network latency-aware routing",
        "Game pathfinding with heuristics"
      ],
      complexity: { time: "O((V + E) log V)", space: "O(V)" }
    },
    {
      id: "bellman-ford",
      name: "Bellman–Ford",
      summary:
        "Shortest paths with negative edges; detects negative cycles; slower but more general than Dijkstra.",
      useCases: [
        "Financial arbitrage detection (negative cycles)",
        "Routing with penalties or credits",
        "When edge weights can be negative"
      ],
      complexity: { time: "O(V·E)", space: "O(V)" }
    },
    {
      id: "floyd-warshall",
      name: "Floyd–Warshall",
      summary:
        "All-pairs shortest paths via dynamic programming; works with negative edges (no negative cycles).",
      useCases: [
        "Dense graphs with many queries",
        "Precomputing transit times between all hubs",
        "Analyzing connectivity matrices"
      ],
      complexity: { time: "O(V³)", space: "O(V²)" }
    },
    {
      id: "mst",
      name: "Minimum Spanning Tree (Kruskal / Prim)",
      summary: "Connect all vertices with minimal total weight without cycles.",
      useCases: [
        "Network and cabling cost minimization",
        "Clustering via single-linkage",
        "Backbone design under budget constraints"
      ],
      complexity: { time: "O(E log V)", space: "O(V)" }
    },
    {
      id: "bipartite-matching",
      name: "Bipartite Matching (Hopcroft–Karp)",
      summary:
        "Maximum matching in bipartite graphs using layered BFS/DFS for augmenting paths.",
      useCases: [
        "Job assignment and marketplaces",
        "Resource allocation (rooms, slots)",
        "Recommendation pairings"
      ],
      complexity: { time: "O(E √V)", space: "O(V + E)" }
    },
    {
      id: "union-find",
      name: "Disjoint Set (Union-Find)",
      summary:
        "Merge/find components with near-constant amortized cost via path compression + union by rank.",
      useCases: [
        "Connected components maintenance",
        "Kruskal’s MST cycle detection",
        "Grouping users/resources into clusters"
      ],
      complexity: { time: "α(n) amortized", space: "O(V)" }
    },
    {
      id: "top-k-shortest",
      name: "k Shortest / Yen’s",
      summary:
        "Enumerate multiple simple shortest paths by perturbing edges and reusing prior results.",
      useCases: [
        "Alternative routes in navigation apps",
        "Backup paths for failover planning",
        "What-if analysis in logistics networks"
      ],
      complexity: { time: "O(k · (V + E) log V)", space: "O(V + E)" }
    },
    {
      id: "max-flow",
      name: "Max Flow / Min Cut (Edmonds–Karp, Dinic)",
      summary:
        "Compute maximum feasible flow; reveals min-cut; Dinic is faster with blocking flows.",
      useCases: [
        "Network throughput planning",
        "Image segmentation (s-t min cut)",
        "Bipartite matching via flow reduction"
      ],
      complexity: { time: "O(V·E²) Edmonds–Karp, O(V²·E) Dinic", space: "O(V + E)" }
    }
  ]
};

export default graphs;
