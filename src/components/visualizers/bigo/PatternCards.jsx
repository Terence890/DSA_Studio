import { PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * PatternCards
 *
 * Displays concise interview-ready notes for Big-O patterns.
 * Provide an array of groups with title and bullets to render.
 *
 * Example shape:
 * [
 *   { title: "O(1) & O(log n)", bullets: ["Hash lookups", "Binary search"] },
 *   { title: "O(n)", bullets: ["Linear scans", "Sliding window"] },
 * ]
 */
export default function PatternCards({
  groups = [],
  heading = "Patterns, examples, and tradeoffs",
  ctaLabel = "Open practice hints",
  onCtaClick,
}) {
  return (
    <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Explain it like an interview
          </p>
          <h2 className="text-xl font-semibold">{heading}</h2>
        </div>
        <Badge
          asChild
          variant="outline"
          className="px-0 py-0"
        >
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium hover:bg-muted/70"
          >
            <PlayCircle className="size-4" />
            {ctaLabel}
          </button>
        </Badge>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-3">
        {(groups.length ? groups : defaultGroups).map((item) => (
          <Card key={item.title} className="border-border/70">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {item.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-primary/70" />
                  <span>{bullet}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

const defaultGroups = [
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
