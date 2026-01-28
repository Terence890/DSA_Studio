import {
  BarChart3,
  BookOpen,
  Brain,
  ChevronRight,
  Layers,
  LineChart,
  PlayCircle,
  Rocket,
  Sparkles,
  Timer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const highlights = [
  {
    label: "Big-O Visualizer",
    value: "Live Graph",
    icon: LineChart,
    tone: "primary",
  },
  {
    label: "Sorting Visualizer",
    value: "Step-by-step",
    icon: Layers,
    tone: "secondary",
  },
  {
    label: "Practice Mode",
    value: "Hints On",
    icon: PlayCircle,
    tone: "ghost",
  },
];

const modules = [
  {
    title: "Big-O Playground",
    description:
      "Drag the input slider and watch complexity curves update in real time.",
    tag: "Core",
    icon: LineChart,
    action: "Open Playground",
    accent: "primary",
    path: "/big-o",
  },
  {
    title: "Sorting Visualizer",
    description:
      "Animate bubble, merge, quick, and heap sort with comparisons counted.",
    tag: "MVP",
    icon: Layers,
    action: "Visualize",
    accent: "secondary",
    path: "/sorting",
  },
  {
    title: "Arrays & Prefix Sum",
    description:
      "Static vs dynamic arrays, prefix sums, sliding window patterns.",
    tag: "Beginner",
    icon: BookOpen,
    action: "Start Module",
    accent: "outline",
    path: "/curriculum",
  },
  {
    title: "Stack & Queue",
    description:
      "Monotonic stack, deque, and LRU cache intuition with code examples.",
    tag: "Interview",
    icon: Brain,
    action: "Review",
    accent: "outline",
    path: "/curriculum",
  },
  {
    title: "Practice Mode",
    description:
      "Solve guided problems with hints and auto complexity insights.",
    tag: "Interactive",
    icon: PlayCircle,
    action: "Enter",
    accent: "secondary",
    path: "/practice",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="w-full space-y-6 p-6">
      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-0">
                PRD Aligned
              </Badge>
              <Badge variant="outline" className="px-2 py-0">
                MVP Scope
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              Master DSA with interactive visuals & interview focus
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Guided curriculum from Big-O foundations to advanced data
              structures. Visualize algorithms, explore complexity, and practice
              with hints — all in one polished workspace.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => navigate("/curriculum")}
              >
                <Rocket className="size-4" />
                Continue Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => navigate("/sorting")}
              >
                <PlayCircle className="size-4" />
                Watch a Demo
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2"
                onClick={() => navigate("/curriculum")}
              >
                <Sparkles className="size-4" />
                View Roadmap
              </Button>
            </div>
          </div>
          <Card className="w-full max-w-xs border-border/80">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="size-4 text-primary" />
                Progress Snapshot
              </CardTitle>
              <CardDescription>
                Track your curriculum and streaks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Curriculum</span>
                <span className="font-semibold">12 / 38 modules</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[32%] rounded-full bg-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-muted-foreground">Streak</p>
                  <p className="text-base font-semibold">7 days</p>
                </div>
                <div className="rounded-lg border border-border/60 p-3">
                  <p className="text-muted-foreground">Focus</p>
                  <p className="text-base font-semibold">Sorting</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-border/60 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => navigate("/practice")}
              >
                <Timer className="size-4" />
                Resume
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="gap-1"
                onClick={() => navigate("/big-o")}
              >
                <LineChart className="size-4" />
                Big-O
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Separator />
        <div className="grid gap-3 sm:grid-cols-3">
          {highlights.map(({ label, value, icon: Icon, tone }) => (
            <Card key={label} className="border-border/70">
              <CardContent className="flex items-center gap-3 py-4">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg ring-1",
                    tone === "primary" &&
                      "bg-primary/10 text-primary ring-primary/20",
                    tone === "secondary" &&
                      "bg-secondary/10 text-secondary-foreground ring-secondary/20",
                    tone === "ghost" &&
                      "bg-muted text-foreground ring-border/60",
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Core Modules</h2>
            <p className="text-sm text-muted-foreground">
              Beginner → Advanced path with visuals, pseudocode, code, and Big-O
              analysis.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => navigate("/curriculum")}
          >
            View All
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map(
            ({ title, description, tag, icon: Icon, action, accent, path }) => (
              <Card
                key={title}
                className="border-border/70 transition hover:-translate-y-1 hover:shadow-sm"
              >
                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-primary" />
                      <Badge
                        variant="outline"
                        className="px-2 py-0 text-[11px]"
                      >
                        {tag}
                      </Badge>
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {description}
                    </CardDescription>
                  </div>
                  <CardAction>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground"
                      onClick={() => navigate(path)}
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button
                    variant={
                      accent === "primary"
                        ? "default"
                        : accent === "secondary"
                          ? "secondary"
                          : "outline"
                    }
                    size="sm"
                    className="gap-2"
                    onClick={() => navigate(path)}
                  >
                    <PlayCircle className="size-4" />
                    {action}
                  </Button>
                </CardFooter>
              </Card>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
