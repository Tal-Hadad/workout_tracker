import { useState, useEffect } from "react";

interface Exercise {
  _id: string;
  name: string;
  bodyPart: string;
  category: string;
}

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const refetch = () => setVersion((v) => v + 1);

  useEffect(() => {
    async function fetchExercises() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/exercises");
        if (!res.ok) throw new Error("Failed to load exercises");
        const data = await res.json();
        setExercises(Array.isArray(data.exercises) ? data.exercises : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchExercises();
  }, [version]);

  return { exercises, loading, error, refetch };
}
