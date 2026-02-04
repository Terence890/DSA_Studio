import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Loader2,
  PlayCircle,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchProblemBySlug } from "@/lib/leetcodeClient";
import { usePracticeStore } from "@/lib/store/practiceStore";

const fallbackMeta = {
  "two-sum": {
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Hashing",
    hints: [
      "Traverse once; store value -> index in a map.",
      "For each value v, check if target - v is already in the map.",
      "Return indices as soon as you find the complement.",
    ],
    complexity: "O(n) time, O(n) space",
    prompt:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}`,
  },
};

export default function ProblemDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState(null);
  const [codeTab, setCodeTab] = useState(null);
  const [activeTab, setActiveTab] = useState("prompt");

  const solvedIds = usePracticeStore((s) => s.solvedIds);
  const toggleSolved = usePracticeStore((s) => s.toggleSolved);

  const leetUrl = useMemo(
    () => (slug ? `https://leetcode.com/problems/${slug}/` : null),
    [slug],
  );

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { problem: data, fallbackUsed } = await fetchProblemBySlug(slug, {
          timeoutMs: 8000,
        });
        if (!mounted) return;
        if (data) {
          setProblem(data);
          setCodeTab(
            data.codeSnippets?.[0]?.slug ||
              data.codeSnippets?.[0]?.lang ||
              null,
          );
        } else if (fallbackUsed && fallbackMeta[slug]) {
          setProblem(fallbackMeta[slug]);
          setCodeTab(null);
        } else {
          setError(new Error("Not found"));
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (slug) load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const isSolved = solvedIds?.has?.(slug);

  const snippets = problem?.codeSnippets ?? [];
  const currentSnippet = useMemo(() => {
    if (snippets.length > 0) {
      return (
        snippets.find((c) => (c.slug || c.lang) === codeTab) || snippets[0]
      );
    }
    if (problem?.code) {
      return { code: problem.code, lang: "JavaScript" };
    }
    return null;
  }, [snippets, codeTab, problem]);

  return (
    <main className="w-full space-y-6 p-6">
      <Breadcrumb
        items={[
          { label: "Practice", onClick: () => navigate("/practice") },
          { label: problem?.title || slug || "Problem" },
        ]}
        className="mb-2"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Badge variant="secondary" className="px-2 py-0">
            Problem Detail
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isSolved ? "secondary" : "outline"}
            size="sm"
            onClick={() => slug && toggleSolved(slug)}
          >
            <CheckCircle2 className="size-4" />
            {isSolved ? "Marked solved" : "Mark solved"}
          </Button>
          {leetUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() =>
                globalThis.open(leetUrl, "_blank", "noopener,noreferrer")
              }
            >
              <PlayCircle className="size-4" />
              Open on LeetCode
            </Button>
          )}
        </div>
      </div>

      <Card className="border-border/70">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="px-2 py-0">
              {problem?.difficulty || "—"}
            </Badge>
            <Badge variant="secondary" className="px-2 py-0">
              {problem?.topic || "Algorithms"}
            </Badge>
            {isSolved && (
              <Badge variant="secondary" className="px-2 py-0">
                Solved
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl">
            {problem?.title || slug || "Problem"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {problem?.prompt || "Loading problem statement..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="complexity">Complexity</TabsTrigger>
            </TabsList>

            <TabsContent value="prompt">
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Loading problem…
                </div>
              )}
              {error && !loading && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <XCircle className="size-4" />
                  {error?.message || "Failed to load problem."}
                </div>
              )}
              {problem && problem.content && (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: problem.content,
                    }}
                  />
                </div>
              )}
              {!problem?.content && problem?.prompt && (
                <p className="text-sm text-muted-foreground">
                  {problem.prompt}
                </p>
              )}
            </TabsContent>

            <TabsContent value="hints">
              <div className="space-y-2 text-sm">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Hints
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  {(problem?.hints || []).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-primary/70" />
                      <span>{h}</span>
                    </li>
                  ))}
                  {(!problem?.hints || problem.hints.length === 0) && (
                    <li className="text-xs text-muted-foreground">
                      No hints available.
                    </li>
                  )}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="solution">
              {snippets.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-3">
                  {snippets.map((c) => {
                    const id = c.slug || c.lang;
                    return (
                      <Button
                        key={id}
                        variant={codeTab === id ? "secondary" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => setCodeTab(id)}
                      >
                        {c.lang}
                      </Button>
                    );
                  })}
                </div>
              )}
              <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3 font-mono text-xs leading-relaxed text-foreground">
                {currentSnippet?.code || "No code snippet available."}
              </pre>
            </TabsContent>

            <TabsContent value="complexity">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lightbulb className="size-4" />
                {problem?.complexity || "—"}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {leetUrl && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  globalThis.open(leetUrl, "_blank", "noopener,noreferrer")
                }
              >
                <PlayCircle className="size-4" />
                Solve on LeetCode
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/practice")}
            >
              <ArrowLeft className="size-4" />
              Back to practice
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
