"use client";
import { Exercise } from "@/app/hooks/exercises";
import styles from "./WorkoutExercise.module.css";

export interface WorkoutSet {
  reps: string;
  weight: string;
}

interface Props {
  id: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  onAddSet: (id: string) => void;
  onUpdateSet: (id: string, index: number, field: "reps" | "weight", value: string) => void;
  onRemoveSet: (id: string, index: number) => void;
  onRemove: (id: string) => void;
}

export default function WorkoutExercise({
  id,
  exercise,
  sets,
  onAddSet,
  onUpdateSet,
  onRemoveSet,
  onRemove,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <p className={styles.exerciseName}>
          {exercise.name}
          <span className={styles.exerciseCategory}>{exercise.category}</span>
        </p>
        <button className={styles.removeExerciseBtn} onClick={() => onRemove(id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      {sets.length > 0 && (
        <div className={styles.setsHeader}>
          <span>Set</span>
          <span>kg</span>
          <span>Reps</span>
          <span />
        </div>
      )}

      {sets.map((set, i) => (
        <div key={i} className={styles.setRow}>
          <span className={styles.setNumber}>{i + 1}</span>
          <input
            className={styles.setInput}
            type="number"
            min="0"
            placeholder="0"
            value={set.weight}
            onChange={(e) => onUpdateSet(id, i, "weight", e.target.value)}
          />
          <input
            className={styles.setInput}
            type="number"
            min="0"
            placeholder="0"
            value={set.reps}
            onChange={(e) => onUpdateSet(id, i, "reps", e.target.value)}
          />
          <button className={styles.removeSetBtn} onClick={() => onRemoveSet(id, i)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      ))}

      <button className={styles.addSetBtn} onClick={() => onAddSet(id)}>
        + Add Set
      </button>
    </div>
  );
}
