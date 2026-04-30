"use client";
import { useState } from "react";
import WorkoutModal, { SavedWorkout } from "../WorkoutModal/WorkoutModal";
import styles from "./WorkoutStarter.module.css";

interface Props {
  onSave: (workout: SavedWorkout) => void;
}

export default function WorkoutStarter({ onSave }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setOpen(true)}>
        Start New Workout
      </button>
      {open && (
        <WorkoutModal
          onClose={() => setOpen(false)}
          onFinish={(workout) => {
            onSave(workout);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
