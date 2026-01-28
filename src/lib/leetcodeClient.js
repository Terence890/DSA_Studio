// Lightweight LeetCode GraphQL client with timeouts and graceful fallbacks.
// Intended for client-side use; handles loading, 404-ish (not found), and offline scenarios.

const ENDPOINT = "https://leetcode.com/graphql";
const DEFAULT_TIMEOUT_MS = 8000;

const PROBLEM_LIST_QUERY = `
  query problemsetQuestionList($limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList(limit: $limit, skip: $skip, filters: $filters) {
      total
      questions {
        questionId
        frontendQuestionId
        title
        titleSlug
        difficulty
        topicTags { name slug }
      }
    }
  }
`;

const PROBLEM_CONTENT_QUERY = `
  query questionContent($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      title
      titleSlug
      difficulty
      content
      topicTags { name slug }
      codeSnippets { lang langSlug code }
    }
  }
`;

/**
 * Core request wrapper with abort + timeout.
 */
async function requestGraphQL({ query, variables = {}, timeoutMs = DEFAULT_TIMEOUT_MS }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`GraphQL HTTP ${res.status}`);
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error(json.errors.map((e) => e.message).join("; "));
    }

    return { data: json.data };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch a page of problems. Filters: difficulty ("EASY"|"MEDIUM"|"HARD") optional.
 */
export async function fetchProblems({
  limit = 12,
  skip = 0,
  difficulty,
  timeoutMs = DEFAULT_TIMEOUT_MS,
} = {}) {
  const variables = {
    limit,
    skip,
    filters: difficulty ? { difficulty } : {},
  };

  try {
    const { data } = await requestGraphQL({
      query: PROBLEM_LIST_QUERY,
      variables,
      timeoutMs,
    });

    const list = data?.problemsetQuestionList;
    const questions = list?.questions ?? [];
    return {
      problems: questions.map(normalizeProblemListItem),
      total: list?.total ?? questions.length,
      fallbackUsed: false,
      error: null,
    };
  } catch (error) {
    return {
      problems: FALLBACK_PROBLEMS,
      total: FALLBACK_PROBLEMS.length,
      fallbackUsed: true,
      error,
    };
  }
}

/**
 * Fetch full problem content by slug.
 */
export async function fetchProblemBySlug(slug, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!slug) {
    return {
      problem: null,
      fallbackUsed: true,
      error: new Error("Missing slug"),
    };
  }

  try {
    const { data } = await requestGraphQL({
      query: PROBLEM_CONTENT_QUERY,
      variables: { titleSlug: slug },
      timeoutMs,
    });

    const raw = data?.question;
    if (!raw) {
      return {
        problem: null,
        fallbackUsed: true,
        error: new Error("Not found"),
      };
    }

    return {
      problem: normalizeProblem(raw),
      fallbackUsed: false,
      error: null,
    };
  } catch (error) {
    const fallback = FALLBACK_PROBLEMS.find((p) => p.titleSlug === slug);
    return {
      problem: fallback ? { ...fallback, content: FALLBACK_CONTENT[fallback.titleSlug] } : null,
      fallbackUsed: true,
      error,
    };
  }
}

/**
 * Normalizers
 */
function normalizeProblemListItem(q) {
  return {
    id: q.questionId ?? q.frontendQuestionId ?? q.titleSlug,
    slug: q.titleSlug,
    title: q.title,
    difficulty: q.difficulty,
    tags: q.topicTags?.map((t) => t.name) ?? [],
  };
}

function normalizeProblem(q) {
  return {
    id: q.questionId ?? q.titleSlug,
    slug: q.titleSlug,
    title: q.title,
    difficulty: q.difficulty,
    tags: q.topicTags?.map((t) => t.name) ?? [],
    content: q.content ?? "",
    codeSnippets:
      q.codeSnippets?.map((c) => ({
        lang: c.lang,
        slug: c.langSlug,
        code: c.code,
      })) ?? [],
  };
}

/**
 * Minimal fallback set to keep the UI usable offline or on API failure.
 */
const FALLBACK_PROBLEMS = [
  {
    id: "1",
    slug: "two-sum",
    title: "Two Sum",
    titleSlug: "two-sum",
    difficulty: "Easy",
    tags: ["Hash Table", "Array"],
  },
  {
    id: "2",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    titleSlug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    tags: ["Hash Table", "Sliding Window", "String"],
  },
  {
    id: "3",
    slug: "container-with-most-water",
    title: "Container With Most Water",
    titleSlug: "container-with-most-water",
    difficulty: "Medium",
    tags: ["Two Pointers", "Greedy"],
  },
];

const FALLBACK_CONTENT = {
  "two-sum": `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Use a hash map to track complements in O(n) time.`,
  "longest-substring-without-repeating-characters": `Maintain a sliding window with a map of last seen indices. Move the left pointer past repeats and track the max window length.`,
  "container-with-most-water": `Two-pointer technique from both ends; move the pointer at the shorter line inward to seek a taller boundary while updating max area.`,
};
