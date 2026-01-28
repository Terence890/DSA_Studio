import { Info, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * InputController
 *
 * A reusable control panel for setting the input size (n) in the Big-O playground.
 * Keeps all slider labeling and helper text in one place so the main page stays lean.
 */
export default function InputController({
  value,
  min = 10,
  max = 2000,
  step = 10,
  label = "Input size (n)",
  helper = "Higher n quickly separates linear from quadratic costs.",
  onChange,
}) {
  return (
    <Card className="w-full max-w-sm border-border/80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="size-4 text-primary" />
          Input size controller
        </CardTitle>
        <CardDescription>Adjust n to see cost changes.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold">{value}</span>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="w-full accent-primary"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{min}</span>
          <span>{Math.round((min + max) / 2)}</span>
          <span>{max}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-3 border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <Info className="size-4" />
        <span>{helper}</span>
        <Badge variant="outline" className="ml-auto px-2 py-0">
          {value}
        </Badge>
      </CardFooter>
    </Card>
  );
}
