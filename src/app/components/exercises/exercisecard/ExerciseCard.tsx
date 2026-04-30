import styles from "./ExerciseCard.module.css";
import { Exercise } from "@/app/hooks/exercises";
import EditExerciseButton from "../editexercisebutton/EditExerciseButton";

interface Props {
  exercise: Exercise;
  onSave: () => void;
}

export default function ExerciseCard({ exercise, onSave }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardInfo}>
          <h2>{exercise.name}</h2>
          <span className={styles.category}>{exercise.category}</span>
        </div>
        <EditExerciseButton exercise={exercise} onSave={onSave} />
      </div>
      <p className={styles.bodyPart}>{exercise.bodyPart}</p>
    </div>
  );
}
