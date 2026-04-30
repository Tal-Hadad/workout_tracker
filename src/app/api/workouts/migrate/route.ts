import dbConnect from "@/lib/mongodb";
import WorkoutHistory from "@/models/WorkoutHistory";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { workouts } = body;

    if (!Array.isArray(workouts) || workouts.length === 0) {
      return Response.json({ migrated: 0 });
    }

    await dbConnect();

    const docs = workouts.map(
      (w: {
        title: string;
        date: string;
        durationSeconds: number;
        entries: { exerciseName: string; sets: { reps: string; weight: string }[] }[];
      }) => ({
        userId: session.user.id,
        title: w.title ?? "Untitled Workout",
        date: w.date ?? "",
        durationSeconds: w.durationSeconds ?? 0,
        entries: Array.isArray(w.entries) ? w.entries : [],
      }),
    );

    await WorkoutHistory.insertMany(docs, { ordered: false });

    return Response.json({ migrated: docs.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Migration failed", detail: message },
      { status: 500 },
    );
  }
}
