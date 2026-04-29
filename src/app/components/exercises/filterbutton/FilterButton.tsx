"use client";
import { useState } from "react";
import styles from "./FilterButton.module.css";

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

export interface ExerciseFilters {
  bodyParts: string[];
  categories: string[];
}

interface FilterButtonProps {
  filters: ExerciseFilters;
  onChange: (filters: ExerciseFilters) => void;
}

export default function FilterButton({ filters, onChange }: FilterButtonProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ExerciseFilters>(filters);

  const activeCount = filters.bodyParts.length + filters.categories.length;

  function openModal() {
    setDraft(filters);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function toggle(field: keyof ExerciseFilters, value: string) {
    setDraft((d) => {
      const current = d[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...d, [field]: next };
    });
  }

  function apply() {
    onChange(draft);
    close();
  }

  function clearDraft() {
    setDraft({ bodyParts: [], categories: [] });
  }

  return (
    <>
      <button
        className={styles.filterBtn}
        onClick={openModal}
        aria-label="Filter exercises"
      >
        <span className="material-symbols-outlined">filter_alt</span>
        {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
      </button>

      {open && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Filter Exercises</h2>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Body Part</legend>
              <div className={styles.checkboxGroup}>
                {BODY_PARTS.map((part) => (
                  <label key={part} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={draft.bodyParts.includes(part)}
                      onChange={() => toggle("bodyParts", part)}
                    />
                    {part}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Category</legend>
              <div className={styles.checkboxGroup}>
                {CATEGORIES.map((cat) => (
                  <label key={cat} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={draft.categories.includes(cat)}
                      onChange={() => toggle("categories", cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.clearBtn}
                onClick={clearDraft}
              >
                Clear
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={close}
              >
                Cancel
              </button>
              <button type="button" className={styles.applyBtn} onClick={apply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
