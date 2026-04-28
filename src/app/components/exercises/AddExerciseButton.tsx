"use client";
import React, { useState } from "react";
import styles from "./AddExerciseButton.module.css";

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
  "Machine/Other",
  "Bodyweight",
  "Assisted Bodywight",
  "Cardio",
];

const emptyForm = { name: "", bodyPart: [] as string[], category: "" };

export default function AddExerciseButton({ onAdd }: { onAdd: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleBodyPart(part: string) {
    setForm((f) => ({
      ...f,
      bodyPart: f.bodyPart.includes(part)
        ? f.bodyPart.filter((p) => p !== part)
        : [...f.bodyPart, part],
    }));
  }

  function close() {
    setOpen(false);
    setForm(emptyForm);
    setError(null);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail ?? "Failed to add exercise");
      }
      onAdd();
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button className={styles.addBtn} onClick={() => setOpen(true)}>
        + Add Exercise
      </button>

      {open && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Add Exercise</h2>
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
                        type="checkbox"
                        checked={form.bodyPart.includes(part)}
                        onChange={() => toggleBodyPart(part)}
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
                  {submitting ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
