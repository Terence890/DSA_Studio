import { useEffect, useState, useCallback } from "react";
import { fetchProblems } from "@/lib/leetcodeClient";

/**
 * useProblems
 * - Fetches a page of LeetCode problems with optional difficulty filter.
 * - Exposes loading/error/fallbackUsed states for UI messaging.
 *
 * @param {Object} options
 * @param {"EASY"|"MEDIUM"|"HARD"|undefined} options.difficulty
 * @param {number} options.limit
 * @param {number} options.skip
 */
export default function useProblems({ difficulty, limit = 12, skip = 0 } = {}) {
  const [problems, setProblems] = useState([]);
  const [total, setTotal] = useState(0);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { problems, total, fallbackUsed } = await fetchProblems({
        difficulty,
        limit,
        skip,
      });
      setProblems(problems);
      setTotal(total);
      setFallbackUsed(fallbackUsed);
    } catch (err) {
      setError(err);
      setProblems([]);
      setTotal(0);
      setFallbackUsed(true);
    } finally {
      setLoading(false);
    }
  }, [difficulty, limit, skip]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      await load();
    })();
    return () => {
      mounted = false;
    };
  }, [load]);

  return {
    problems,
    total,
    fallbackUsed,
    loading,
    error,
    refetch: load,
  };
}
