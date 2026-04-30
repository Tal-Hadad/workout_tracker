import { SavedWorkout } from "../WorkoutModal/WorkoutModal";
import styles from "./HistoryCard.module.css";

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${seconds}s`;
}

interface Props {
  workout: SavedWorkout;
}

export default function HistoryCard({ workout }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{workout.title}</h2>
        <div className={styles.meta}>
          <span className="material-symbols-outlined">calendar_today</span>
          <span>{workout.date}</span>
          <span className={styles.dot}>·</span>
          <span className="material-symbols-outlined">timer</span>
          <span>{formatDuration(workout.durationSeconds)}</span>
        </div>
      </div>

      {workout.entries.length === 0 ? (
        <p className={styles.noExercises}>No exercises recorded.</p>
      ) : (
        <div className={styles.exercises}>
          {workout.entries.map((entry, i) => (
            <div key={i} className={styles.exercise}>
              <p className={styles.exerciseName}>{entry.exerciseName}</p>
              <div className={styles.sets}>
                {entry.sets.map((set, j) => (
                  <div key={j} className={styles.setRow}>
                    <span className={styles.setLabel}>Set {j + 1}</span>
                    <span>{set.weight ? `${set.weight} kg` : "— kg"}</span>
                    <span>{set.reps ? `${set.reps} reps` : "— reps"}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
