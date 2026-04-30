"use client";
import { useState } from "react";
import { useExercises, Exercise } from "@/app/hooks/exercises";
import styles from "./ExercisePicker.module.css";

interface Props {
  onSelect: (exercise: Exercise) => void;
  onClose: () => void;
}

export default function ExercisePicker({ onSelect, onClose }: Props) {
  const { exercises, loading } = useExercises();
  const [query, setQuery] = useState("");

  const filtered = exercises.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetHeader}>
          <h2 className={styles.sheetTitle}>Select Exercise</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search exercises..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.list}>
          {loading && <p className={styles.message}>Loading...</p>}
          {!loading && filtered.length === 0 && (
            <p className={styles.message}>No exercises found.</p>
          )}
          {filtered.map((exercise) => (
            <button
              key={exercise._id}
              className={styles.item}
              onClick={() => onSelect(exercise)}
            >
              <span className={styles.itemName}>{exercise.name}</span>
              <span className={styles.itemMeta}>
                {exercise.category} · {exercise.bodyPart}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
