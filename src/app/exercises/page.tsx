"use client";
import styles from "./page.module.css";
import { useExercises } from "@/app/hooks/exercises";
import AddExerciseButton from "@/app/components/exercises/AddExerciseButton";

export default function ExercisesList() {
  const { exercises, loading, error, refetch } = useExercises();

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Exercises</h1>
        <AddExerciseButton onAdd={refetch} />
      </div>

      {exercises.map((exercise) => (
        <div key={exercise._id} className={styles.card}>
          <h2>
            {exercise.name} ({exercise.category})
          </h2>
          <p>{exercise.bodyPart.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
