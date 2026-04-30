import dbConnect from "@/lib/mongodb";
import Exercise from "@/models/Exercise";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const exercise = await Exercise.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!exercise) {
      return Response.json({ error: "Exercise not found" }, { status: 404 });
    }
    return Response.json({ exercise });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to update exercise", detail: message },
      { status: 500 },
    );
  }
}
