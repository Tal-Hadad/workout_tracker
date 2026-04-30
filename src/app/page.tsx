"use client";
import { useState } from "react";
import styles from "./page.module.css";
import WorkoutStarter from "./components/workout/StartWorkoutButton/WorkoutStarter";
import HistoryCard from "./components/workout/HistoryCard/HistoryCard";
import { SavedWorkout } from "./components/workout/WorkoutModal/WorkoutModal";

export default function Home() {
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);

  return (
    <>
      <main className={styles.page}>
        <h1>Workout</h1>
        <WorkoutStarter
          onSave={(w) => setSavedWorkouts((prev) => [w, ...prev])}
        />
      </main>
      <aside className={styles.page}>
        <h1>Past Workouts</h1>
        {savedWorkouts.length === 0 ? (
          <p className={styles.empty}>No workouts saved yet.</p>
        ) : (
          savedWorkouts.map((w) => <HistoryCard key={w.id} workout={w} />)
        )}
      </aside>
    </>
  );
}
