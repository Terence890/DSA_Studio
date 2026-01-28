import { CheckCircle2, PlayCircle } from "lucide-react";

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
import { cn } from "@/lib/utils";

/**
 * AlgorithmPicker
 *
 * Displays a set of sorting algorithms and lets the user activate one.
 * Expects algorithms shaped like:
 * { id, name, desc, best, avg, worst, space }
 */
export default function AlgorithmPicker({
  algorithms = defaultAlgorithms,
  activeAlgo,
  onSelect,
  className,
}) {
  return (
    <Card className={cn("border-border/70", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="size-4 text-primary" />
          Algorithm picker
        </CardTitle>
        <CardDescription>Select an algorithm to animate.</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {algorithms.map((algo) => {
          const isActive = algo.id === activeAlgo;
          const isDisabled = Boolean(algo.disabled);
          return (
            <Card
              key={algo.id}
              className={cn(
                "border border-border/70 transition hover:-translate-y-1 hover:shadow-sm",
                isActive && "border-primary/50 ring-1 ring-primary/30",
              )}
            >
              <CardHeader className="space-y-2 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{algo.name}</CardTitle>
                  <Badge
                    variant={
                      isDisabled
                        ? "outline"
                        : isActive
                          ? "secondary"
                          : "outline"
                    }
                    className="px-2 py-0 text-[11px]"
                  >
                    {isDisabled
                      ? "Coming soon"
                      : isActive
                        ? "Active"
                        : "Select"}
                  </Badge>
                </div>
                <CardDescription>
                  {algo.desc}
                  {isDisabled ? " — not yet supported in this visualizer." : ""}
                </CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                <span>Best</span>
                <span className="text-right font-semibold text-foreground">
                  {algo.best}
                </span>
                <span>Average</span>
                <span className="text-right font-semibold text-foreground">
                  {algo.avg}
                </span>
                <span>Worst</span>
                <span className="text-right font-semibold text-foreground">
                  {algo.worst}
                </span>
                <span>Space</span>
                <span className="text-right font-semibold text-foreground">
                  {algo.space}
                </span>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  variant={
                    isDisabled ? "outline" : isActive ? "default" : "outline"
                  }
                  size="sm"
                  className="gap-2"
                  onClick={() => !isDisabled && onSelect?.(algo.id)}
                  disabled={isDisabled}
                >
                  {isDisabled ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Coming soon
                    </>
                  ) : isActive ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Selected
                    </>
                  ) : (
                    <>
                      <PlayCircle className="size-4" />
                      Animate
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}

const defaultAlgorithms = [
  {
    id: "bubble",
    name: "Bubble Sort",
    desc: "Simple adjacent swaps; stable; great for teaching comparisons.",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    desc: "Sorted prefix grows; excellent for nearly sorted arrays.",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
  },
  {
    id: "merge",
    name: "Merge Sort",
    desc: "Divide & conquer with stable merges; guaranteed n log n.",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
  },
  {
    id: "quick",
    name: "Quick Sort",
    desc: "Partition-based; fast on average; worst-case quadratic.",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
  },
  {
    id: "heap",
    name: "Heap Sort",
    desc: "Binary heap; in-place; consistent n log n bounds.",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
  },
];
