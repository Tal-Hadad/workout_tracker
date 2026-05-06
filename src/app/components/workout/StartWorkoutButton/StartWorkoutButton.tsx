"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WorkoutModal, { SavedWorkout } from "../WorkoutModal/WorkoutModal";
import styles from "./StartWorkoutButton.module.css";

interface Props {
  onSave: (workout: SavedWorkout) => void;
}

export default function StartWorkoutButton({ onSave }: Props) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  function handleClick() {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <button className={styles.button} onClick={handleClick}>
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
