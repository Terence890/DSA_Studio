import { useEffect, useRef, useState } from "react";
import {
  AlarmClock,
  BookOpenCheck,
  CheckCircle2,
  Lightbulb,
  Loader2,
  ListChecks,
  PlayCircle,
  Timer,
  Zap,
  XCircle,
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
import useProblems from "@/lib/hooks/useProblems";
import { fetchProblemBySlug } from "@/lib/leetcodeClient";
import { usePracticeStore } from "@/lib/store/practiceStore";
import { cn } from "@/lib/utils";

const localProblemMeta = [
  {
    id: "two-sum",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Hashing",
    prompt:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    hints: [
      "Can you find a complement while traversing?",
      "Use a map to store value → index.",
      "Check if target - nums[i] already exists.",
    ],
    complexity: "O(n) time, O(n) space",
  },
  {
    id: "longest-substring",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Sliding Window",
    prompt:
      "Given a string s, find the length of the longest substring without repeating characters.",
    hints: [
      "Maintain a window with a hash map of last seen indices.",
      "If a character repeats, move the left pointer past its last seen position.",
      "Track max window length along the way.",
    ],
    complexity: "O(n) time, O(k) space",
  },
  {
    id: "max-area",
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Two Pointers",
    prompt:
      "Given n non-negative integers representing heights, find two lines that together with the x-axis form a container, such that the container holds the most water.",
    hints: [
      "Start with both ends as pointers.",
      "Move the shorter side inward to seek a taller line.",
      "Track max area each step.",
    ],
    complexity: "O(n) time, O(1) space",
  },
  {
    id: "kth-largest",
    slug: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    topic: "Heap / Quickselect",
    prompt:
      "Find the kth largest element in an unsorted array. Note that it is the kth largest element in sorted order, not the kth distinct element.",
    hints: [
      "Use a min-heap of size k (streaming friendly).",
      "Or use quickselect partitioning for average O(n).",
      "Beware worst-case O(n²) with poor pivots.",
    ],
    complexity: "O(n log k) heap or O(n) avg quickselect",
  },
];

export default function Practice() {
  const navigate = useNavigate();
  const problemsRef = useRef(null);
  const timerRef = useRef(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [solutionProblem, setSolutionProblem] = useState(null);
  const [solutionData, setSolutionData] = useState(null);
  const [solutionLoading, setSolutionLoading] = useState(false);
  const [solutionError, setSolutionError] = useState(null);
  const [solutionCodeTab, setSolutionCodeTab] = useState(null);
  const [difficulty, setDifficulty] = useState();

  const solvedIds = usePracticeStore((s) => s.solvedIds);
  const hintsUsed = usePracticeStore((s) => s.hintsUsed);
  const timerSeconds = usePracticeStore((s) => s.timerSeconds);
  const incrementHint = usePracticeStore((s) => s.incrementHint);
  const toggleSolved = usePracticeStore((s) => s.toggleSolved);

  const { problems, loading, error, fallbackUsed, refetch } = useProblems({
    difficulty,
    limit: 12,
    skip: 0,
  });

  const solutions = {
    "two-sum": `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    "longest-substring": `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;
    }
    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    "max-area": `function maxArea(h) {
  let l = 0, r = h.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, Math.min(h[l], h[r]) * (r - l));
    if (h[l] < h[r]) l++; else r--;
  }
  return best;
}`,
    "kth-largest": `function findKthLargest(nums, k) {
  const heap = [];
  const push = (x) => { heap.push(x); heap.sort((a,b)=>a-b); if (heap.length > k) heap.shift(); };
  nums.forEach(push);
  return heap[0];
}`,
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleContinue = () =>
    problemsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const handleSolutions = () => {
    const target = problems[0] ?? localProblemMeta[0];
    if (target) loadSolution(target);
  };
  const handleJumpBigO = () => navigate("/big-o");
  const handleStartTimer = () => {
    if (timerRunning) {
      clearInterval(timerRef.current);
      setTimerRunning(false);
      return;
    }
    setTimerRunning(true);
    timerRef.current = setInterval(() => {
      const { timerSeconds: current, setTimerSeconds: setSeconds } =
        usePracticeStore.getState();
      setSeconds(current + 1);
    }, 1000);
  };
  const handleResume = () => handleContinue();
  const showHint = (problemId, hintCount) =>
    incrementHint(problemId, hintCount);
  const openSolve = (problem) => loadSolution(problem);
  const markDone = (problem) => toggleSolved(problem.id);

  const getMeta = (p) =>
    localProblemMeta.find(
      (m) =>
        m.id === p.id ||
        m.slug === p.slug ||
        m.title === p.title ||
        m.title === p.titleSlug,
    );

  const loadSolution = async (problem) => {
    setSolutionProblem(problem);
    setSolutionLoading(true);
    setSolutionError(null);
    setSolutionData(null);
    setSolutionCodeTab(null);
    try {
      const { problem: full, fallbackUsed: fb } = await fetchProblemBySlug(
        problem.slug || problem.titleSlug || problem.title || problem.id,
        { timeoutMs: 8000 },
      );
      if (full) {
        setSolutionData(full);
        setSolutionCodeTab(
          full.codeSnippets?.[0]?.slug || full.codeSnippets?.[0]?.lang || null,
        );
      } else if (fb) {
        setSolutionData(null);
      }
    } catch (err) {
      setSolutionError(err);
    } finally {
      setSolutionLoading(false);
    }
  };

  const solvedCount = solvedIds?.size ?? 0;
  const hintsUsedCount = Object.values(hintsUsed ?? {}).reduce(
    (a, b) => a + b,
    0,
  );
  const avgTime = formatTime(timerSeconds || 0);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <main className="w-full space-y-6 p-6">
      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-0">
                Practice Mode
              </Badge>
              <Badge variant="outline" className="px-2 py-0">
                Hints + Complexity
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              Solve curated DSA problems with guided hints
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Work through interview-ready problems with stepwise hints,
              time/space complexity notes, and quick links to visualizers for
              deeper intuition.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="lg" className="gap-2" onClick={handleContinue}>
                <PlayCircle className="size-4" />
                Continue practice
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={handleSolutions}
              >
                <BookOpenCheck className="size-4" />
                View solutions
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2"
                onClick={handleJumpBigO}
              >
                <Zap className="size-4" />
                Jump to Big-O
              </Button>
            </div>
          </div>
          <Card className="w-full max-w-sm border-border/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Timer className="size-4 text-primary" />
                Momentum tracker
              </CardTitle>
              <CardDescription>Your practice snapshot.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                <p className="text-muted-foreground">Solved</p>
                <p className="text-base font-semibold text-primary">
                  {solvedCount}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                <p className="text-muted-foreground">Hints used</p>
                <p className="text-base font-semibold text-amber-500">
                  {hintsUsedCount}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                <p className="text-muted-foreground">Timer</p>
                <p className="text-base font-semibold">
                  {formatTime(timerSeconds)}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                <p className="text-muted-foreground">Avg session</p>
                <p className="text-base font-semibold text-muted-foreground">
                  {avgTime}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-border/60 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleStartTimer}
              >
                <AlarmClock className="size-4" />
                {timerRunning ? "Pause timer" : "Start timer"}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="gap-1"
                onClick={handleResume}
              >
                <PlayCircle className="size-4" />
                Resume
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section ref={problemsRef} className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Problem set</h2>
            <p className="text-sm text-muted-foreground">
              Hashing, sliding windows, heaps, and two-pointer patterns.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="h-9 rounded-md border border-border/60 bg-card px-2 text-sm text-foreground"
              value={difficulty ?? ""}
              onChange={(e) =>
                setDifficulty(
                  e.target.value === "" ? undefined : e.target.value,
                )
              }
            >
              <option value="">All</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={refetch}
            >
              Refresh
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-3 py-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading LeetCode problems…
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <XCircle className="size-4" />
            Failed to load problems. Showing fallbacks. (
            {error?.message || "Error"})
          </div>
        )}

        {fallbackUsed && !loading && !error && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-400/60 bg-amber-400/10 px-3 py-2 text-xs text-amber-800">
            Using fallback problems (offline-friendly). Refresh to retry live
            data.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((p) => {
            const meta = getMeta(p) ?? {};
            const shownHints = hintsUsed?.[p.id] ?? 0;
            const isSolved = solvedIds?.has?.(p.id);
            const prompt =
              meta.prompt ??
              "Problem statement available in the solution modal.";
            const topic = meta.topic ?? p.tags?.[0] ?? "Algorithms";
            const hints = meta.hints ?? [];
            const complexity =
              meta.complexity ??
              "Complexity details available in the solution modal.";
            const hintCount = hints.length;
            const leetUrl = `https://leetcode.com/problems/${p.slug || p.id}/`;

            return (
              <Card
                key={p.id}
                className={cn(
                  "h-full min-h-[420px] flex flex-col border-border/70 transition hover:-translate-y-1 hover:shadow-sm",
                  isSolved && "border-emerald-400/60",
                )}
                onClick={() =>
                  window.open(leetUrl, "_blank", "noopener,noreferrer")
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>{p.title}</CardTitle>
                    <CardAction className="flex items-center gap-2">
                      {isSolved && (
                        <Badge variant="secondary" className="px-2 py-0">
                          Solved
                        </Badge>
                      )}
                      <Badge
                        variant={
                          p.difficulty === "Easy" ? "secondary" : "outline"
                        }
                        className="px-2 py-0"
                      >
                        {p.difficulty}
                      </Badge>
                    </CardAction>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {prompt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground overflow-hidden">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs font-semibold text-foreground">
                    {topic}
                  </div>
                  <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Hints{" "}
                      {shownHints > 0 ? `(${shownHints}/${hintCount})` : ""}
                    </p>
                    {shownHints === 0 ? (
                      <div className="mt-1 text-xs text-muted-foreground">
                        Click “Show hint” to reveal stepwise guidance.
                      </div>
                    ) : (
                      <ul className="mt-1 space-y-1">
                        {hints.slice(0, shownHints).map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span className="mt-1 size-1.5 rounded-full bg-primary/70" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ListChecks className="size-4" />
                    {complexity}
                  </div>
                </CardContent>
                <CardFooter
                  className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      showHint(p.id, hintCount);
                    }}
                    disabled={shownHints >= hintCount}
                  >
                    <Lightbulb className="size-4" />
                    {shownHints >= hintCount ? "All hints shown" : "Show hint"}
                  </Button>
                  <div className="flex flex-wrap gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(leetUrl, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <PlayCircle className="size-4" />
                      Open LeetCode
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        openSolve(p);
                      }}
                    >
                      <PlayCircle className="size-4" />
                      Solution
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        markDone(p);
                      }}
                    >
                      <CheckCircle2 className="size-4" />
                      {isSolved ? "Undo" : "Mark done"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        {!loading && problems.length === 0 && (
          <div className="rounded-lg border border-border/60 bg-card/60 px-3 py-6 text-center text-sm text-muted-foreground">
            No problems available. Try refreshing or relax the filters.
          </div>
        )}
      </section>

      <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Practice guidance</p>
            <h3 className="text-xl font-semibold">
              How to reason about complexity
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleJumpBigO}
          >
            <PlayCircle className="size-4" />
            Open Big-O Playground
          </Button>
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Hashing & O(1)",
              bullets: [
                "Lookups/insert/delete in expected O(1)",
                "Great for pair-sum and frequency maps",
                "Watch for collisions & load factors",
              ],
            },
            {
              title: "Sliding window & O(n)",
              bullets: [
                "Shrink/expand window to maintain invariants",
                "Use counts/sets to track validity",
                "Avoid nested loops for linear time",
              ],
            },
            {
              title: "Heaps & O(n log n)",
              bullets: [
                "Top-k streaming with min-heap size k",
                "Priority scheduling and Dijkstra",
                "Space can be O(k) or O(n)",
              ],
            },
          ].map((item) => (
            <Card key={item.title} className="border-border/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {item.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-primary/70" />
                    <span>{b}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {solutionProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-border/70 bg-card shadow-xl ring-1 ring-border/50">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <PlayCircle className="size-4 text-primary" />
                {solutionProblem.title} — solution
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSolutionProblem(null)}
              >
                Close
              </Button>
            </div>
            <div className="max-h-[70vh] overflow-auto px-4 py-3 space-y-3">
              <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                Difficulty: {solutionProblem.difficulty ?? "Unknown"}
              </div>
              {solutionLoading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Loading solution…
                </div>
              )}
              {solutionError && (
                <div className="flex items-center gap-2 text-xs text-destructive">
                  <XCircle className="size-4" />
                  Failed to load live solution; showing local fallback if
                  available.
                </div>
              )}
              {solutionData?.codeSnippets?.length > 0 && (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {solutionData.codeSnippets.map((c) => (
                      <Button
                        key={c.slug || c.lang}
                        variant={
                          solutionCodeTab === (c.slug || c.lang)
                            ? "secondary"
                            : "outline"
                        }
                        size="sm"
                        className="text-xs"
                        onClick={() => setSolutionCodeTab(c.slug || c.lang)}
                      >
                        {c.lang}
                      </Button>
                    ))}
                  </div>
                  <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3 font-mono text-xs leading-relaxed text-foreground">
                    {solutionData.codeSnippets.find(
                      (c) => (c.slug || c.lang) === solutionCodeTab,
                    )?.code ?? solutionData.codeSnippets[0]?.code}
                  </pre>
                </div>
              )}
              <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3 font-mono text-xs leading-relaxed text-foreground">
                {solutionData?.content ??
                  solutions[solutionProblem.id] ??
                  "Solution coming soon. Add more solutions by extending the solutions map."}
              </pre>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
