import { memo } from "react";
import styles from "./ExerciseCard.module.css";
import { Exercise } from "@/app/hooks/useExercises";
import EditExerciseButton from "../editexercisebutton/EditExerciseButton";
import DeleteExerciseButton from "../deleteexercisebutton/DeleteExerciseButton";

interface Props {
  exercise: Exercise;
  onSave: () => void;
  sessionUserId?: string | null;
}

function ExerciseCard({ exercise, onSave, sessionUserId }: Props) {
  const canEdit = exercise.userId != null && exercise.userId === sessionUserId;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h2>{exercise.name}</h2>
          <span className={styles.category}>{exercise.category}</span>
        </div>
        {canEdit && (
          <div className={styles.cardActions}>
            <EditExerciseButton exercise={exercise} onSave={onSave} />
            <DeleteExerciseButton
              exerciseId={exercise._id}
              exerciseName={exercise.name}
              onDelete={onSave}
            />
          </div>
        )}
      </div>
      <p className={styles.bodyPart}>{exercise.bodyPart}</p>
    </div>
  );
}

export default memo(ExerciseCard);
