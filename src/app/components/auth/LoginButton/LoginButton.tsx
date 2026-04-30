"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./LoginButton.module.css";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (session?.user) {
    return (
      <button
        className={styles.loginButton}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <span className="material-symbols-outlined">account_circle</span>
        {session.user.name ?? session.user.email}
      </button>
    );
  }

  return (
    <button
      className={styles.loginButton}
      onClick={() => router.push("/auth/login")}
    >
      <span className="material-symbols-outlined">account_circle</span>
      Log in
    </button>
  );
}
