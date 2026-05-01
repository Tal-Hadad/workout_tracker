import dbConnect from "@/lib/mongodb";
import WorkoutHistory from "@/models/WorkoutHistory";
import { auth } from "@/auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const workout = await WorkoutHistory.findById(id);
    if (!workout) {
      return Response.json({ error: "Workout not found" }, { status: 404 });
    }

    if (workout.userId.toString() !== session.user.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    await workout.deleteOne();
    return Response.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to delete workout", detail: message },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const workout = await WorkoutHistory.findById(id);
    if (!workout) {
      return Response.json({ error: "Workout not found" }, { status: 404 });
    }

    if (workout.userId.toString() !== session.user.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, durationSeconds, entries } = body;

    if (!title || durationSeconds == null) {
      return Response.json(
        { error: "title and durationSeconds are required." },
        { status: 400 },
      );
    }

    workout.title = title;
    workout.durationSeconds = durationSeconds;
    workout.entries = entries ?? [];
    await workout.save();

    return Response.json({ workout });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to update workout", detail: message },
      { status: 500 },
    );
  }
}
