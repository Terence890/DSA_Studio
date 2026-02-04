import { useRef } from "react";
import { Lightbulb, Sparkles, BookOpenCheck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import algorithmsCatalog from "@/constants/algorithms/index.js";

export default function Curriculum() {
  const navigate = useNavigate();
  const roadmapRef = useRef(null);
  const scrollToRoadmap = () =>
    roadmapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="w-full space-y-6 p-6">
      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-0">
                Algorithms Catalog
              </Badge>
              <Badge variant="outline" className="px-2 py-0">
                Beginner → Advanced
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              Industrial-grade DSA curriculum with real-world use cases
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Browse every category from foundations to advanced graph, DP, and
              greedy topics. Each card highlights where it’s used in real
              products and systems.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => navigate("/big-o")}
              >
                <Sparkles className="size-4" />
                Start learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={scrollToRoadmap}
              >
                <BookOpenCheck className="size-4" />
                View roadmap
              </Button>
            </div>
          </div>
          <Card className="w-full max-w-sm border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="size-4 text-primary" />
                Interview-ready framing
              </CardTitle>
              <CardDescription>
                Each algorithm lists complexity and when to use it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                Emphasize why this algorithm fits the scenario.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                Contrast alternatives (e.g., quick vs merge vs heap).
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                State time/space clearly; note stability and data shapes.
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronRight className="size-4" />
                Prep tips
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section ref={roadmapRef} className="grid gap-4">
        {algorithmsCatalog.map((category) => (
          <Card
            key={category.id}
            className="border-border/70 bg-card/70 shadow-xs transition hover:-translate-y-1 hover:shadow-sm"
          >
            <CardHeader className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="px-2 py-0 text-[11px]">
                    {category.level}
                  </Badge>
                  <Badge variant="outline" className="px-2 py-0 text-[11px]">
                    {category.title}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <CardDescription>
                  Curated algorithms with interview framing and product-grade
                  use cases.
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                View all
                <ChevronRight className="size-4" />
              </Button>
            </CardHeader>

            <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {category.algorithms.map((algo) => (
                <Card
                  key={algo.id}
                  className="border border-border/60 bg-card/70 transition hover:shadow-sm"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{algo.name}</CardTitle>
                      <Badge
                        variant="outline"
                        className="px-2 py-0 text-[11px]"
                      >
                        {algo.complexity.time}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {algo.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Real-world use cases
                    </p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {algo.useCases?.map((u) => (
                        <div key={u} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full bg-primary/70" />
                          <span>{u}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                    <span>Space: {algo.complexity.space}</span>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      <Sparkles className="size-3.5" />
                      Learn
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
