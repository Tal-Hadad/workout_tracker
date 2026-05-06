"use client";
import React, { useState } from "react";
import styles from "./EditExerciseButton.module.css";
import { Exercise } from "@/app/hooks/useExercises";

const BODY_PARTS = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Core",
  "Full Body",
  "Other",
];

const CATEGORIES = [
  "Barbell",
  "Dumbbell",
  "Cable",
  "Machine/Other",
  "Bodyweight",
  "Assisted Bodywight",
  "Cardio",
];

interface Props {
  exercise: Exercise;
  onSave: () => void;
}

export default function EditExerciseButton({ exercise, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: exercise.name,
    bodyPart: exercise.bodyPart,
    category: exercise.category,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleOpen() {
    setForm({
      name: exercise.name,
      bodyPart: exercise.bodyPart,
      category: exercise.category,
    });
    setError(null);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/exercises/${exercise._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail ?? "Failed to update exercise");
      }
      onSave();
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        className={styles.editBtn}
        onClick={handleOpen}
        aria-label="Edit exercise"
      >
        <span className="material-symbols-outlined">edit</span>
      </button>

      {open && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Edit Exercise</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                Name
                <input
                  className={styles.input}
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                />
              </label>

              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Body Part</legend>
                <div className={styles.checkboxGroup}>
                  {BODY_PARTS.map((part) => (
                    <label key={part} className={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="bodyPart"
                        value={part}
                        checked={form.bodyPart === part}
                        onChange={() =>
                          setForm((f) => ({ ...f, bodyPart: part }))
                        }
                        required
                      />
                      {part}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className={styles.label}>
                Category
                <select
                  className={styles.input}
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
