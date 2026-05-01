"use client";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useExercises } from "@/app/hooks/exercises";
import { useFilteredExercises } from "@/app/hooks/useFilteredExercises";
import ExerciseCard from "@/app/components/exercises/exercisecard/ExerciseCard";
import ExerciseToolbar from "@/app/components/exercises/exercisetoolbar/ExerciseToolbar";

export default function ExercisesList() {
  const { data: session } = useSession();
  const { exercises, loading, error, refetch } = useExercises();
  const {
    query,
    setQuery,
    filters,
    setFilters,
    sortOrder,
    setSortOrder,
    filteredExercises,
  } = useFilteredExercises(exercises);

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Exercises</h1>
      </div>
      <ExerciseToolbar
        query={query}
        onQueryChange={setQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        filters={filters}
        onFiltersChange={setFilters}
        onAdd={refetch}
      />
      {filteredExercises.map((exercise) => (
        <ExerciseCard
          key={exercise._id}
          exercise={exercise}
          onSave={refetch}
          sessionUserId={session?.user?.id}
        />
      ))}
    </div>
  );
}
