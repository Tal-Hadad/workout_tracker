import dbConnect from "@/lib/mongodb";
import Exercise from "@/models/Exercise";
import { auth } from "@/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    await dbConnect();
    const { id } = await params;

    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return Response.json({ error: "Exercise not found" }, { status: 404 });
    }
    if (exercise.userId == null) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    if (exercise.userId.toString() !== session?.user?.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const updated = await Exercise.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return Response.json({ exercise: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to update exercise", detail: message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    await dbConnect();
    const { id } = await params;

    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return Response.json({ error: "Exercise not found" }, { status: 404 });
    }
    if (exercise.userId == null) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
    if (exercise.userId.toString() !== session?.user?.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    await Exercise.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to delete exercise", detail: message },
      { status: 500 },
    );
  }
}
