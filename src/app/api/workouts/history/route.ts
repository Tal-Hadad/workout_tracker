import dbConnect from "@/lib/mongodb";
import WorkoutHistory from "@/models/WorkoutHistory";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const workouts = await WorkoutHistory.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      workouts: workouts.map((w) => ({ ...w, id: String(w._id) })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to fetch workout history", detail: message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { title, date, durationSeconds, entries } = body;

    if (!title || !date || durationSeconds == null) {
      return Response.json(
        { error: "title, date, and durationSeconds are required." },
        { status: 400 },
      );
    }

    const workout = await WorkoutHistory.create({
      userId: session.user.id,
      title,
      date,
      durationSeconds,
      entries: entries ?? [],
    });

    return Response.json({ workout }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to save workout", detail: message },
      { status: 500 },
    );
  }
}
