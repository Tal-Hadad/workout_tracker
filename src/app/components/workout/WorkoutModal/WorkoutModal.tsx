"use client";
import { useState, useEffect } from "react";
import { Exercise } from "@/app/hooks/useExercises";
import WorkoutExercise, {
  WorkoutSet,
} from "../WorkoutExercise/WorkoutExercise";
import ExercisePicker from "../ExercisePicker/ExercisePicker";
import styles from "./WorkoutModal.module.css";

interface WorkoutEntry {
  id: string;
  exercise: Exercise;
  sets: WorkoutSet[];
}

export interface SavedWorkout {
  id: string;
  title: string;
  date: string;
  durationSeconds: number;
  entries: Array<{ exerciseName: string; sets: WorkoutSet[] }>;
}

interface Props {
  onClose: () => void;
  onFinish: (workout: SavedWorkout) => void;
}

function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const today = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

export default function WorkoutModal({ onClose, onFinish }: Props) {
  const [entries, setEntries] = useState<WorkoutEntry[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [title, setTitle] = useState("New Workout");

  useEffect(() => {
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  function addExercise(exercise: Exercise) {
    setEntries((prev) => [
      ...prev,
      { id: crypto.randomUUID(), exercise, sets: [{ reps: "", weight: "" }] },
    ]);
    setShowPicker(false);
  }

  function addSet(id: string) {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, sets: [...e.sets, { reps: "", weight: "" }] } : e,
      ),
    );
  }

  function updateSet(
    id: string,
    index: number,
    field: "reps" | "weight",
    value: string,
  ) {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              sets: e.sets.map((s, i) =>
                i === index ? { ...s, [field]: value } : s,
              ),
            }
          : e,
      ),
    );
  }

  function removeSet(id: string, index: number) {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, sets: e.sets.filter((_, i) => i !== index) } : e,
      ),
    );
  }

  function removeExercise(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div>
          <input
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Workout title"
          />
          <div className={styles.timerRow}>
            <span className="material-symbols-outlined">calendar_today</span>
            <span className={styles.date}>{today}</span>
            <span className={styles.separator}>·</span>
            <span className="material-symbols-outlined">timer</span>
            <span className={styles.timer}>{formatElapsed(elapsed)}</span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className={styles.content}>
        {entries.length === 0 && (
          <p className={styles.emptyState}>
            No exercises yet. Tap &quot;Add Exercise&quot; to get started.
          </p>
        )}
        {entries.map((entry) => (
          <WorkoutExercise
            key={entry.id}
            id={entry.id}
            exercise={entry.exercise}
            sets={entry.sets}
            onAddSet={addSet}
            onUpdateSet={updateSet}
            onRemoveSet={removeSet}
            onRemove={removeExercise}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <button
          className={styles.addExerciseBtn}
          onClick={() => setShowPicker(true)}
        >
          + Add Exercise
        </button>
        <button
          className={styles.finishBtn}
          onClick={() => {
            onFinish({
              id: crypto.randomUUID(),
              title,
              date: today,
              durationSeconds: elapsed,
              entries: entries.map((e) => ({
                exerciseName: e.exercise.name,
                sets: e.sets,
              })),
            });
          }}
        >
          Finish
        </button>
      </div>

      {showPicker && (
        <ExercisePicker
          onSelect={addExercise}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
