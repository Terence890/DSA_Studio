import React from "react";
import { cn } from "@/lib/utils";

/**
 * TraceBars
 *
 * A lightweight, stateless bar visualizer for sorting traces.
 * Pass in an array of numeric values and optional highlight sets (e.g., comparisons, swaps, pivot, sorted).
 *
 * Props:
 * - values: number[] (required) — the heights to render
 * - comparing?: Set<number> or number[] — indices being compared
 * - swapping?: Set<number> or number[] — indices being swapped
 * - pivot?: number | null — pivot index (for quicksort-style visuals)
 * - sorted?: Set<number> or number[] — indices considered sorted/locked
 * - maxHeight?: number — max height percentage cap (default 100)
 * - className?: string — container class overrides
 * - renderLabel?: (value: number, index: number) => ReactNode — optional label below each bar
 */
function TraceBars({
  values = [],
  comparing,
  swapping,
  pivot = null,
  sorted,
  maxHeight = 100,
  className,
  renderLabel,
}) {
  const comparingSet = toSet(comparing);
  const swappingSet = toSet(swapping);
  const sortedSet = toSet(sorted);

  const max = Math.max(...values, 1);
  const safeMax = max <= 0 ? 1 : max;

  return (
    <div
      className={cn(
        "flex items-end gap-2 md:gap-3 rounded-xl border border-border/60 bg-muted/40 px-4 py-5",
        "transition-colors duration-200",
        className,
      )}
    >
      {values.map((v, idx) => {
        const heightPct = Math.min(maxHeight, Math.max(8, (v / safeMax) * 100));
        const isComparing = comparingSet.has(idx);
        const isSwapping = swappingSet.has(idx);
        const isSorted = sortedSet.has(idx);
        const isPivot = pivot === idx;

        return (
          <div key={idx} className="flex-1">
            <div
              className={cn(
                "w-full rounded-t-md bg-gradient-to-t from-background/60 to-primary/80 shadow-sm ring-1 ring-border/40",
                "transition-[height,transform,box-shadow,background-color] duration-250 ease-out will-change-transform",
                isComparing &&
                  "ring-amber-400/80 shadow-[0_8px_18px_rgba(251,191,36,0.35)] outline outline-2 outline-amber-300/70",
                isSwapping &&
                  "scale-[1.04] ring-rose-400/80 bg-rose-400/80 shadow-[0_10px_20px_rgba(248,113,113,0.35)]",
                isSorted &&
                  "translate-y-[2px] ring-emerald-400/80 bg-emerald-400/80 shadow-[0_10px_20px_rgba(52,211,153,0.35)]",
                isPivot &&
                  "scale-[1.03] ring-sky-400/80 bg-sky-400/80 shadow-[0_10px_20px_rgba(125,211,252,0.35)]",
              )}
              style={{
                height: `${heightPct}%`,
                transitionDuration: "260ms",
              }}
              aria-label={`index ${idx}, value ${v}`}
            />
            <div className="pt-2 text-center text-[11px] text-muted-foreground">
              {renderLabel ? renderLabel(v, idx) : v}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function toSet(input) {
  if (!input) return new Set();
  if (input instanceof Set) return input;
  if (Array.isArray(input)) return new Set(input);
  return new Set([input]);
}

export { TraceBars, TraceBars as default };
