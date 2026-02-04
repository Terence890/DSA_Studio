import { useMemo, useRef, useState } from "react";
import { LineChart, PlayCircle, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GrowthChart from "@/components/visualizers/bigo/GrowthChart";
import InputController from "@/components/visualizers/bigo/InputController";
import OperationCounter from "@/components/visualizers/bigo/OperationCounter";
import PatternCards from "@/components/visualizers/bigo/PatternCards";

const sampleSizes = [10, 50, 100, 250, 500, 1000];

const complexityProfiles = [
  {
    id: "constant",
    name: "O(1)",
    color: "bg-emerald-400/80 text-emerald-900 ring-emerald-500/30",
    detail: "Constant time — work does not grow with n.",
    compute: () => 1,
  },
  {
    id: "logn",
    name: "O(log n)",
    color: "bg-sky-400/80 text-sky-950 ring-sky-500/30",
    detail: "Divide-and-conquer patterns (binary search, BST lookups).",
    compute: (n) => Math.log2(Math.max(n, 1) + 1),
  },
  {
    id: "n",
    name: "O(n)",
    color: "bg-indigo-400/80 text-indigo-950 ring-indigo-500/30",
    detail: "Linear scans and simple traversals.",
    compute: (n) => n,
  },
  {
    id: "nlogn",
    name: "O(n log n)",
    color: "bg-amber-400/80 text-amber-950 ring-amber-500/30",
    detail: "Efficient sorts and divide-and-conquer merges.",
    compute: (n) => n * Math.log2(Math.max(n, 1) + 1),
  },
  {
    id: "n2",
    name: "O(n²)",
    color: "bg-rose-400/80 text-rose-950 ring-rose-500/30",
    detail: "Nested loops and quadratic comparisons.",
    compute: (n) => n * n,
  },
];

export default function BigOPlayground() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [n, setN] = useState(120);
  const [opsPerMs] = useState(50_000); // hypothetical ops/ms for display

  const handleStart = () => {
    setN(120);
    chartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const growthData = useMemo(() => {
    return complexityProfiles.map((profile) => ({
      ...profile,
      series: sampleSizes.map((size) => ({
        size,
        value: profile.compute(size),
      })),
    }));
  }, []);

  const currentOps = useMemo(() => {
    return complexityProfiles.map((profile) => {
      const value = profile.compute(n);
      const ms = value / opsPerMs;
      return {
        ...profile,
        value,
        ms,
      };
    });
  }, [n, opsPerMs]);

  const patternGroups = [
    {
      title: "O(1) & O(log n)",
      bullets: [
        "Hash lookups, stacks, queues",
        "Binary search, BST height",
        "Fastest for lookups and divide & conquer",
      ],
    },
    {
      title: "O(n) & O(n log n)",
      bullets: [
        "Linear scans, BFS/DFS",
        "Merge/quick/heap sort",
        "Good defaults for general cases",
      ],
    },
    {
      title: "O(n²)",
      bullets: [
        "Nested loops on pairs",
        "Naive sorts & grid DP",
        "Avoid for large n; seek pruning or better pivots",
      ],
    },
  ];

  return (
    <main className="w-full space-y-6 p-6">
      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-0">
                Big-O Playground
              </Badge>
              <Badge variant="outline" className="px-2 py-0">
                Visual Intuition
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              Compare time complexity with live inputs
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Drag the input slider to see how operations scale across common
              complexities. Use the charts and counters to build intuition for
              algorithm design and interview explanations.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="lg" className="gap-2" onClick={handleStart}>
                <PlayCircle className="size-4" />
                Start with n = {n}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => navigate("/sorting")}
              >
                <LineChart className="size-4" />
                Sorting Visualizer
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2"
                onClick={() => navigate("/practice")}
              >
                <Timer className="size-4" />
                Practice Mode
              </Button>
            </div>
          </div>
          <InputController value={n} onChange={setN} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card ref={chartRef} className="border-border/70">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <LineChart className="size-4 text-primary" />
              Complexity growth chart
            </CardTitle>
            <CardDescription>
              Relative operation counts across sample sizes (10 → 1000).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GrowthChart profiles={growthData} sampleSizes={sampleSizes} />
          </CardContent>
        </Card>

        <OperationCounter
          title={`Operation counter (n = ${n})`}
          entries={currentOps}
          opsPerMs={opsPerMs}
        />
      </section>

      <PatternCards
        groups={patternGroups}
        heading="Patterns, examples, and tradeoffs"
        ctaLabel="Open practice hints"
      />
    </main>
  );
}
