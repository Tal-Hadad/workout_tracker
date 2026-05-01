"use client";
import { useState } from "react";
import { SavedWorkout } from "../WorkoutModal/WorkoutModal";
import { WorkoutSet } from "../WorkoutExercise/WorkoutExercise";
import ExercisePicker from "../ExercisePicker/ExercisePicker";
import { Exercise } from "@/app/hooks/exercises";
import styles from "./EditWorkoutModal.module.css";

interface EditEntry {
  id: string;
  exerciseName: string;
  sets: WorkoutSet[];
}

interface Props {
  workout: SavedWorkout;
  onClose: () => void;
  onSave: (
    id: string,
    updates: Pick<SavedWorkout, "title" | "durationSeconds" | "entries">,
  ) => Promise<void>;
}

export default function EditWorkoutModal({ workout, onClose, onSave }: Props) {
  const [title, setTitle] = useState(workout.title);
  const [entries, setEntries] = useState<EditEntry[]>(
    workout.entries.map((e) => ({ id: crypto.randomUUID(), ...e })),
  );
  const [showPicker, setShowPicker] = useState(false);
  const [saving, setSaving] = useState(false);

  function addExercise(exercise: Exercise) {
    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        exerciseName: exercise.name,
        sets: [{ reps: "", weight: "" }],
      },
    ]);
    setShowPicker(false);
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function addSet(id: string) {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, sets: [...e.sets, { reps: "", weight: "" }] } : e,
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

  async function handleSave() {
    setSaving(true);
    await onSave(workout.id, {
      title,
      durationSeconds: workout.durationSeconds,
      entries: entries.map(({ exerciseName, sets }) => ({ exerciseName, sets })),
    });
    setSaving(false);
    onClose();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <input
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Workout title"
          />
          <div className={styles.metaRow}>
            <span className="material-symbols-outlined">calendar_today</span>
            <span className={styles.date}>{workout.date}</span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className={styles.content}>
        {entries.length === 0 && (
          <p className={styles.emptyState}>
            No exercises. Tap &quot;Add Exercise&quot; to add one.
          </p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className={styles.entry}>
            <div className={styles.entryHeader}>
              <p className={styles.exerciseName}>{entry.exerciseName}</p>
              <button
                className={styles.removeEntryBtn}
                onClick={() => removeEntry(entry.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>

            {entry.sets.length > 0 && (
              <div className={styles.setsHeader}>
                <span>Set</span>
                <span>kg</span>
                <span>Reps</span>
                <span />
              </div>
            )}

            {entry.sets.map((set, i) => (
              <div key={i} className={styles.setRow}>
                <span className={styles.setNumber}>{i + 1}</span>
                <input
                  className={styles.setInput}
                  type="number"
                  min="0"
                  placeholder="0"
                  value={set.weight}
                  onChange={(e) => updateSet(entry.id, i, "weight", e.target.value)}
                />
                <input
                  className={styles.setInput}
                  type="number"
                  min="0"
                  placeholder="0"
                  value={set.reps}
                  onChange={(e) => updateSet(entry.id, i, "reps", e.target.value)}
                />
                <button
                  className={styles.removeSetBtn}
                  onClick={() => removeSet(entry.id, i)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ))}

            <button
              className={styles.addSetBtn}
              onClick={() => addSet(entry.id)}
            >
              + Add Set
            </button>
          </div>
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
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save"}
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
