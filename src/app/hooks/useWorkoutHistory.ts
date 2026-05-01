"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

  const fetchFromServer = useCallback(async () => {
    const res = await fetch("/api/workouts/history");
    if (res.ok) {
      const data = await res.json();
      setHistory(data.workouts as SavedWorkout[]);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.id) {
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

        await fetchFromServer();
        setLoading(false);
      };

      doFetch();
    } else {
      setHistory(readLocalStorage());
      setLoading(false);
    }
  }, [session, status, fetchFromServer]);

  async function saveWorkout(workout: SavedWorkout) {
    if (session?.user?.id) {
      const res = await fetch("/api/workouts/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
      });
      if (res.ok) {
        await fetchFromServer();
      }
    } else {
      const updated = [workout, ...history];
      writeLocalStorage(updated);
      setHistory(updated);
    }
  }

  async function updateWorkout(
    id: string,
    updates: Pick<SavedWorkout, "title" | "durationSeconds" | "entries">,
  ) {
    if (session?.user?.id) {
      const res = await fetch(`/api/workouts/history/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        await fetchFromServer();
      }
    } else {
      const updated = history.map((w) =>
        w.id === id ? { ...w, ...updates } : w,
      );
      writeLocalStorage(updated);
      setHistory(updated);
    }
  }

  async function deleteWorkout(id: string) {
    if (session?.user?.id) {
      const res = await fetch(`/api/workouts/history/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchFromServer();
      }
    } else {
      const updated = history.filter((w) => w.id !== id);
      writeLocalStorage(updated);
      setHistory(updated);
    }
  }

  return { history, loading, saveWorkout, updateWorkout, deleteWorkout };
}
