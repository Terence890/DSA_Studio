import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivitySquare,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ListChecks,
  Pause,
  Play,
  PlayCircle,
  SkipBack,
  SkipForward,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Controls from "@/components/visualizers/sorting/Controls";
import AlgorithmPicker from "@/components/visualizers/sorting/AlgorithmPicker";
import TraceBars from "@/components/visualizers/sorting/TraceBars";
import {
  applySteps,
  bubbleSortSteps,
  heapSortSteps,
  insertionSortSteps,
  mergeSortSteps,
  quickSortSteps,
  shuffleArray,
} from "@/components/visualizers/sorting/engine/index.js";
import sortingCatalog from "@/constants/algorithms/sorting.js";

const supportedEngines = {
  "merge-sort": "merge",
  "quick-sort": "quick",
  "heap-sort": "heap",
  "insertion-sort": "insertion",
  bubble: "bubble",
};

const catalogAlgorithms =
  sortingCatalog?.algorithms?.map((algo) => {
    const engineId = supportedEngines[algo.id];
    const supported = Boolean(engineId);
    return {
      id: supported ? engineId : algo.id,
      name: algo.name,
      desc: `${algo.summary}${supported ? "" : " (unsupported in this visualizer)"}`,
      best: algo.complexity?.time || "—",
      avg: algo.complexity?.time || "—",
      worst: algo.complexity?.time || "—",
      space: algo.complexity?.space || "—",
      disabled: !supported,
    };
  }) ?? [];

const extraBubble = {
  id: "bubble",
  name: "Bubble Sort",
  desc: "Simple adjacent swaps; stable; great for teaching comparisons.",
  best: "O(n)",
  avg: "O(n²)",
  worst: "O(n²)",
  space: "O(1)",
  disabled: false,
};

const algorithms = [
  extraBubble,
  ...catalogAlgorithms.filter((a) => a.id !== "bubble"),
];

const stepsByAlgo = {
  bubble: [
    "Compare adjacent elements and swap if out of order.",
    "After each full pass, the largest element bubbles to the end.",
    "Repeat n-1 passes until no swaps remain.",
  ],
  insertion: [
    "Treat left side as sorted; pick next key from the right.",
    "Shift larger elements rightward to make space.",
    "Insert the key at its correct position; advance the boundary.",
  ],
  merge: [
    "Recursively split the array into halves.",
    "Merge sorted halves by picking the smaller head each time.",
    "Combine results until the full array is merged and sorted.",
  ],
  quick: [
    "Pick a pivot (e.g., last element).",
    "Partition: place items < pivot to the left, > pivot to the right.",
    "Recursively sort left and right partitions; concatenate.",
  ],
  heap: [
    "Heapify the array into a max-heap.",
    "Swap root with the last element (extract max).",
    "Reduce heap size and sift-down to restore heap property; repeat.",
  ],
};

const pseudocodeByAlgo = {
  bubble: `for i in 0..n-1:
    swapped = false
    for j in 0..n-i-2:
        if a[j] > a[j+1]:
            swap(a[j], a[j+1]); swapped = true
    if not swapped: break`,
  insertion: `for i in 1..n-1:
    key = a[i]; j = i-1
    while j >= 0 and a[j] > key:
        a[j+1] = a[j]; j--
    a[j+1] = key`,
  merge: `mergeSort(l, r):
    if l >= r: return
    m = (l+r)/2
    mergeSort(l, m); mergeSort(m+1, r)
    merge(l, m, r)`,
  quick: `quickSort(l, r):
    if l >= r: return
    p = partition(l, r) // pivot placed
    quickSort(l, p-1); quickSort(p+1, r)`,
  heap: `buildMaxHeap(a)
for end = n-1 downto 1:
    swap(a[0], a[end]); heapifyDown(0, end)`,
};

const algoRunners = {
  bubble: bubbleSortSteps,
  insertion: insertionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
  heap: heapSortSteps,
};

function makeInitialArray(size) {
  return Array.from(
    { length: size },
    (_, i) => ((i * 7) % 41) + ((i * 3) % 17),
  );
}

export default function SortingVisualizer() {
  const [activeAlgo, setActiveAlgo] = useState("merge");
  const [speed, setSpeed] = useState(1.0);
  const [size, setSize] = useState(24);
  const [values, setValues] = useState(() =>
    shuffleArray(makeInitialArray(24)),
  );
  const [steps, setSteps] = useState(() =>
    algoRunners[activeAlgo](shuffleArray(makeInitialArray(24))),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPseudo, setShowPseudo] = useState(false);
  const [pseudoText, setPseudoText] = useState("");
  const timerRef = useRef(null);

  const totalSteps = steps.length;

  const resetWith = (algoId, newSize = size) => {
    const runner = algoRunners[algoId] ?? bubbleSortSteps;
    const base = makeInitialArray(newSize);
    const arr = shuffleArray(base);
    const newSteps = runner(arr);
    setValues(arr);
    setSteps(newSteps);
    setStepIndex(0);
    setIsPlaying(false);
  };

  const goToStart = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };
  const goToEnd = () => {
    setIsPlaying(false);
    setStepIndex(totalSteps);
  };
  const stepBackward = () => {
    setIsPlaying(false);
    setStepIndex((idx) => Math.max(0, idx - 1));
  };
  const stepForward = () => {
    setIsPlaying(false);
    setStepIndex((idx) => Math.min(idx + 1, totalSteps));
  };
  const handleScrub = (value) => {
    setIsPlaying(false);
    setStepIndex(value);
  };
  const togglePlay = () => setIsPlaying((v) => !v);

  useEffect(() => {
    resetWith(activeAlgo, size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAlgo, size]);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIndex >= steps.length) {
      setIsPlaying(false);
      return;
    }
    const delay = Math.max(40, 450 / Math.max(speed, 0.1));
    timerRef.current = setTimeout(() => {
      setStepIndex((idx) => Math.min(idx + 1, steps.length));
    }, delay);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, stepIndex, steps.length, speed]);

  const complexity = useMemo(
    () => algorithms.find((a) => a.id === activeAlgo) || algorithms[0],
    [activeAlgo],
  );

  const currentStep =
    stepIndex > 0 ? steps[Math.min(stepIndex - 1, steps.length - 1)] : null;

  const comparing = useMemo(
    () =>
      currentStep?.type === "compare"
        ? new Set(currentStep.indices)
        : new Set(),
    [currentStep],
  );
  const swapping = useMemo(
    () =>
      currentStep?.type === "swap" ? new Set(currentStep.indices) : new Set(),
    [currentStep],
  );
  const pivot = currentStep?.type === "pivot" ? currentStep.indices[0] : null;

  const sorted = useMemo(() => {
    const set = new Set();
    for (let i = 0; i < Math.min(stepIndex, steps.length); i++) {
      const st = steps[i];
      if (st.type === "markSorted") {
        st.indices.forEach((idx) => set.add(idx));
      }
    }
    return set;
  }, [steps, stepIndex]);

  const displayedValues = useMemo(
    () => applySteps(values, steps.slice(0, stepIndex)),
    [values, steps, stepIndex],
  );

  return (
    <main className="w-full space-y-6 p-6">
      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-0">
                Sorting Visualizer
              </Badge>
              <Badge variant="outline" className="px-2 py-0">
                Step-by-step
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              Animate comparisons, swaps, and partitions
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Compare Bubble, Insertion, Merge, Quick, and Heap with animated
              traces, operation counts, and Big-O intuition tailored for
              interviews.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => setIsPlaying(true)}
              >
                <PlayCircle className="size-4" />
                Play animation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => resetWith(activeAlgo, size)}
              >
                <Sparkles className="size-4" />
                Reset data
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2"
                onClick={() => {
                  setPseudoText(
                    pseudocodeByAlgo[activeAlgo] || "Pseudocode not available.",
                  );
                  setShowPseudo(true);
                }}
              >
                <Sparkles className="size-4" />
                View code & pseudocode
              </Button>
            </div>
          </div>
          <Controls
            size={size}
            onSizeChange={setSize}
            speed={speed}
            onSpeedChange={setSpeed}
            onShuffle={() => resetWith(activeAlgo, size)}
            onPlayToggle={togglePlay}
            isPlaying={isPlaying}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <AlgorithmPicker
          algorithms={algorithms}
          activeAlgo={activeAlgo}
          onSelect={(id) => {
            const target = algorithms.find((a) => a.id === id);
            if (target?.disabled) return;
            setActiveAlgo(id);
          }}
        />

        <Card className="border-border/70">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ActivitySquare className="size-4 text-primary" />
              Visual trace
            </CardTitle>
            <CardDescription>
              Bars reflect the current array state; highlights show live
              comparisons, swaps, pivots, and sorted items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TraceBars
              values={displayedValues}
              comparing={comparing}
              swapping={swapping}
              sorted={sorted}
              pivot={pivot}
              renderLabel={(v) => v}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <div className="flex w-full items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={goToStart}
                aria-label="Go to start"
              >
                <SkipBack className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={stepBackward}
                aria-label="Step backward"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant={isPlaying ? "secondary" : "default"}
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  if (stepIndex >= steps.length) {
                    setStepIndex(0);
                  }
                  togglePlay();
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={stepForward}
                aria-label="Step forward"
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={goToEnd}
                aria-label="Go to end"
              >
                <SkipForward className="size-4" />
              </Button>
              <div className="flex-1 px-2">
                <input
                  type="range"
                  min={0}
                  max={steps.length}
                  step={1}
                  value={Math.min(stepIndex, steps.length)}
                  onChange={(e) => handleScrub(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between text-[11px] text-muted-foreground">
              <span>
                Step {Math.min(stepIndex, steps.length)} / {steps.length}
              </span>
              <span>{isPlaying ? "Playing" : "Paused"}</span>
            </div>
          </CardFooter>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListChecks className="size-4 text-primary" />
              Steps for {complexity.name}
            </CardTitle>
            <CardDescription>
              High-level sequence to narrate during interviews.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stepsByAlgo[activeAlgo].map((step, i) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-sm"
              >
                <div className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                  {i + 1}
                </div>
                <div className="text-muted-foreground">{step}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock3 className="size-4 text-primary" />
              Complexity cheat sheet
            </CardTitle>
            <CardDescription>
              Best / average / worst time and space.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <span>Best</span>
              <span className="text-right font-semibold text-foreground">
                {complexity.best}
              </span>
              <span>Average</span>
              <span className="text-right font-semibold text-foreground">
                {complexity.avg}
              </span>
              <span>Worst</span>
              <span className="text-right font-semibold text-foreground">
                {complexity.worst}
              </span>
              <span>Space</span>
              <span className="text-right font-semibold text-foreground">
                {complexity.space}
              </span>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-xs text-muted-foreground">
              <Clock3 className="size-4" />
              Talk through pivot choice (quick), stability (merge vs quick vs
              heap), and memory (merge extra buffer, heap in-place).
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <Button variant="outline" size="sm" className="gap-2">
              <PlayCircle className="size-4" />
              Run side-by-side
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Sparkles className="size-4" />
              View code & pseudocode
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Interview prompts</p>
            <h2 className="text-xl font-semibold">How to explain tradeoffs</h2>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <PlayCircle className="size-4" />
            Open practice hints
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "When to pick quick vs merge?",
              tips: [
                "Quick is in-place & cache-friendly",
                "Merge is stable with guaranteed n log n",
                "Pivot choice avoids worst-case",
              ],
            },
            {
              title: "Why is insertion great for small n?",
              tips: [
                "Tiny inputs: low constant factors",
                "Nearly sorted arrays hit O(n)",
                "Used inside hybrid sorts (Timsort)",
              ],
            },
            {
              title: "Heap vs quick?",
              tips: [
                "Heap: consistent n log n, in-place",
                "Quick: faster average due to locality",
                "Heaps are not stable",
              ],
            },
          ].map((item) => (
            <Card key={item.title} className="border-border/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {item.tips.map((tip) => (
                  <div
                    key={tip}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1 size-1.5 rounded-full bg-primary/70" />
                    <span>{tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {showPseudo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-2xl border border-border/70 bg-card shadow-xl ring-1 ring-border/50">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="size-4 text-primary" />
                Pseudocode — {algorithms.find((a) => a.id === activeAlgo)?.name}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowPseudo(false)}
              >
                Close
              </Button>
            </div>
            <div className="max-h-[60vh] overflow-auto px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <pre className="whitespace-pre-wrap font-mono text-xs">
                {pseudoText}
              </pre>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
