import styles from "./Offline.module.css";

export default function OfflinePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>You&apos;re offline</h1>
      <p className={styles.message}>
        We can&apos;t reach the network right now. Reconnect and try again.
      </p>
    </main>
  );
}
