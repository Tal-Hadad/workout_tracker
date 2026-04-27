import styles from "./page.module.css";
import WorkoutStarter from "./components/workout/WorkoutStarter";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>Workout</h1>
      <WorkoutStarter />
    </main>
  );
}
