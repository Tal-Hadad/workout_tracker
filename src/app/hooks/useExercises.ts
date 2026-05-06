import useSWR from "swr";

export interface Exercise {
  _id: string;
  name: string;
  bodyPart: string;
  category: string;
  userId?: string | null;
}

interface ExercisesResponse {
  exercises: Exercise[];
}

const fetcher = (url: string): Promise<ExercisesResponse> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to load exercises");
    return r.json();
  });

export function useExercises() {
  const { data, error, isLoading, mutate } = useSWR<ExercisesResponse>("/api/exercises", fetcher);
  return {
    exercises: Array.isArray(data?.exercises) ? data.exercises : [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch: mutate,
  };
}
