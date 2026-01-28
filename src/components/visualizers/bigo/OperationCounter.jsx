import React from "react";
import { Gauge, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * OperationCounter
 *
 * Displays per-complexity operation estimates and timing for a given input size.
 *
 * props:
 * - entries: Array<{ id, name, detail, color, value, ms }>
 * - opsPerMs: number (for display context only)
 * - title: string
 */
export default function OperationCounter({
  entries = [],
  opsPerMs = 50_000,
  title = "Operation counter",
}) {
  return (
    <Card className="border-border/70">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="size-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          Estimated operations and time (hypothetical {opsPerMs.toLocaleString()} ops/ms).
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start justify-between rounded-lg border border-border/60 bg-card/60 px-3 py-2"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Badge
                  variant="outline"
                  className={`px-2 py-0 text-[11px] ring-1 ${entry.color ?? "ring-border/60"}`}
                >
                  {entry.name}
                </Badge>
                <span className="text-muted-foreground">{entry.detail}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Ops: {formatNumber(entry.value)} · Time: {formatTime(entry.ms)}
              </div>
            </div>
            <div className="text-right text-[11px] uppercase tracking-wide text-muted-foreground">
              growth ∝ {entry.name}
            </div>
          </div>
        ))}

        {!entries.length && (
          <p className="text-sm text-muted-foreground">
            Add complexity entries to see per-curve operations.
          </p>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <Gauge className="size-4" />
        Notice how quadratic growth explodes as n doubles, while log-based curves stay tame.
      </CardFooter>
    </Card>
  );
}

function formatNumber(value) {
  if (value === undefined || value === null) return "—";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function formatTime(ms) {
  if (ms === undefined || ms === null) return "—";
  if (ms < 0.01) return "<0.01 ms";
  if (ms < 1) return `${ms.toFixed(2)} ms`;
  if (ms < 1000) return `${ms.toFixed(0)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}
