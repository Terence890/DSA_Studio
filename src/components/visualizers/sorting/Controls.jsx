import React from "react";
import { Gauge, Pause, Play, Shuffle, SlidersHorizontal, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Sorting Controls
 * - Keeps array size, animation speed, shuffle, and play/pause in one place.
 * - Pass callbacks to wire into your visualizer state machine.
 *
 * Props:
 *  - size: number
 *  - onSizeChange: (n: number) => void
 *  - speed: number (multiplier, e.g., 0.25–2)
 *  - onSpeedChange: (n: number) => void
 *  - onShuffle?: () => void
 *  - onPlayToggle?: () => void
 *  - isPlaying?: boolean
 *  - title?: string
 *  - description?: string
 */
export default function Controls({
  size = 16,
  onSizeChange,
  speed = 1,
  onSpeedChange,
  onShuffle,
  onPlayToggle,
  isPlaying = false,
  title = "Controls",
  description = "Tune array size and animation speed.",
}) {
  return (
    <Card className="w-full border-border/80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="size-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Array size</span>
            <span className="font-semibold">{size}</span>
          </div>
          <input
            type="range"
            min={5}
            max={128}
            step={1}
            value={size}
            onChange={(e) => onSizeChange?.(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>5</span>
            <span>64</span>
            <span>128</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Speed (x)</span>
            <span className="font-semibold">{speed.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min={0.25}
            max={2}
            step={0.05}
            value={speed}
            onChange={(e) => onSpeedChange?.(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>0.25x</span>
            <span>1x</span>
            <span>2x</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Gauge className="size-4" />
          <span>Slower speeds highlight comparisons; faster shows throughput.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            type="button"
            onClick={onShuffle}
          >
            <Shuffle className="size-4" />
            Shuffle
          </Button>
          <Button
            variant={isPlaying ? "secondary" : "default"}
            size="sm"
            className="gap-1"
            type="button"
            onClick={onPlayToggle}
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Badge variant="outline" className="gap-1 px-2 py-0">
            <Sparkles className="size-3" />
            Guided
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
