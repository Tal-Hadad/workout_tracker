"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { SavedWorkout } from "@/app/components/workout/WorkoutModal/WorkoutModal";

const LS_KEY = "workoutHistory";

function readLocalStorage(): SavedWorkout[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SavedWorkout[]) : [];
  } catch {
    return [];
  }
}

function writeLocalStorage(workouts: SavedWorkout[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(workouts));
}

function clearLocalStorage() {
  localStorage.removeItem(LS_KEY);
}

export function useWorkoutHistory() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState<SavedWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const migrated = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.id) {
      // Migrate localStorage → MongoDB once per login, then fetch from server
      const localItems = readLocalStorage();
      const doFetch = async () => {
        if (localItems.length > 0 && !migrated.current) {
          migrated.current = true;
          await fetch("/api/workouts/migrate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workouts: localItems }),
          });
          clearLocalStorage();
        }

        const res = await fetch("/api/workouts/history");
        if (res.ok) {
          const data = await res.json();
          setHistory(data.workouts as SavedWorkout[]);
        }
        setLoading(false);
      };

      doFetch();
    } else {
      // Not logged in — use localStorage
      setHistory(readLocalStorage());
      setLoading(false);
    }
  }, [session, status]);

  async function saveWorkout(workout: SavedWorkout) {
    if (session?.user?.id) {
      const res = await fetch("/api/workouts/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
      });
      if (res.ok) {
        setHistory((prev) => [workout, ...prev]);
      }
    } else {
      const updated = [workout, ...history];
      writeLocalStorage(updated);
      setHistory(updated);
    }
  }

  return { history, loading, saveWorkout };
}
