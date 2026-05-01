"use client";
import { useState } from "react";
import styles from "./page.module.css";
import WorkoutStarter from "./components/workout/StartWorkoutButton/WorkoutStarter";
import HistoryCard from "./components/workout/HistoryCard/HistoryCard";
import EditWorkoutModal from "./components/workout/EditWorkoutModal/EditWorkoutModal";
import { SavedWorkout } from "./components/workout/WorkoutModal/WorkoutModal";
import { useWorkoutHistory } from "./hooks/useWorkoutHistory";

export default function Home() {
  const { history, loading, saveWorkout, updateWorkout, deleteWorkout } = useWorkoutHistory();
  const [editingWorkout, setEditingWorkout] = useState<SavedWorkout | null>(
    null,
  );

  return (
    <>
      <main className={styles.page}>
        <h1>Workout</h1>
        <WorkoutStarter onSave={saveWorkout} />
      </main>
      <aside className={styles.page}>
        <h1>Past Workouts</h1>
        {loading ? (
          <p className={styles.empty}>Loading…</p>
        ) : history.length === 0 ? (
          <p className={styles.empty}>No workouts saved yet.</p>
        ) : (
          history.map((w) => (
            <HistoryCard key={w.id} workout={w} onEdit={setEditingWorkout} onDelete={deleteWorkout} />
          ))
        )}
      </aside>

      {editingWorkout && (
        <EditWorkoutModal
          workout={editingWorkout}
          onClose={() => setEditingWorkout(null)}
          onSave={(id, updates) => updateWorkout(id, updates)}
        />
      )}
    </>
  );
}
