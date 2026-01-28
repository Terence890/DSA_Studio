import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * GrowthChart
 *
 * A reusable visualization for Big-O growth curves.
 * Accepts a list of complexity profiles and sample sizes, then renders
 * per-profile bar charts normalized to the largest observed value.
 *
 * Expected profile shape:
 * {
 *   id: string;
 *   name: string;
 *   detail?: string;
 *   color?: string; // tailwind utility classes to tint chips
 *   compute?: (n: number) => number; // if series not provided
 *   series?: { size: number; value: number }[]; // optional precomputed
 * }
 */
export default function GrowthChart({
  profiles = [],
  sampleSizes = [10, 50, 100, 250, 500, 1000],
  className,
  showDetails = true,
}) {
  const normalized = useMemo(() => {
    return profiles.map((profile) => {
      const rawSeries =
        profile.series && profile.series.length
          ? profile.series
          : sampleSizes.map((size) => ({
              size,
              value: profile.compute ? profile.compute(size) : 0,
            }));

      const max = Math.max(...rawSeries.map((s) => s.value), 0);
      const safeMax = max <= 0 ? 1 : max;

      const normalizedSeries = rawSeries.map((s) => ({
        ...s,
        height: Math.max(8, Math.min(100, (s.value / safeMax) * 100)),
      }));

      return { ...profile, series: normalizedSeries };
    });
  }, [profiles, sampleSizes]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {normalized.map((profile) => (
        <div
          key={profile.id}
          className="space-y-2 rounded-xl border border-border/60 bg-card/60 p-3 shadow-xs"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                  profile.color ||
                    "bg-primary/10 text-primary ring-primary/20"
                )}
              >
                {profile.name}
              </span>
              {showDetails && profile.detail ? (
                <span className="text-sm text-muted-foreground">
                  {profile.detail}
                </span>
              ) : null}
            </div>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              n → {sampleSizes[sampleSizes.length - 1]}
            </span>
          </div>

          <div className="flex items-end gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-4">
            {profile.series.map((point) => (
              <div
                key={`${profile.id}-${point.size}`}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full max-w-[42px] rounded-t-md bg-gradient-to-t from-background to-primary/80 shadow-sm ring-1 ring-border/40 transition-all"
                  style={{ height: `${point.height}%` }}
                  aria-label={`${profile.name} at n=${point.size}: ${point.value.toFixed?.(2) ?? point.value
                    }`}
                />
                <span className="text-[11px] text-muted-foreground">
                  n={point.size}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-2 py-1">
              Max:{" "}
              {Math.max(...profile.series.map((s) => s.value)).toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-2 py-1">
              Samples: {profile.series.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
