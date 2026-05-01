"use client";
import React, { useState } from "react";
import styles from "./DeleteExerciseButton.module.css";

interface Props {
  exerciseId: string;
  exerciseName: string;
  onDelete: () => void;
}

export default function DeleteExerciseButton({
  exerciseId,
  exerciseName,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleOpen() {
    setError(null);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setError(null);
  }

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/exercises/${exerciseId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail ?? "Failed to delete exercise");
      }
      onDelete();
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        className={styles.deleteBtn}
        onClick={handleOpen}
        aria-label="Delete exercise"
      >
        <span className="material-symbols-outlined">delete</span>
      </button>

      {open && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Delete Exercise</h2>
            <p className={styles.message}>
              Are you sure you want to delete <strong>{exerciseName}</strong>?
              This action cannot be undone.
            </p>
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
                type="button"
                className={styles.deleteConfirmBtn}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
