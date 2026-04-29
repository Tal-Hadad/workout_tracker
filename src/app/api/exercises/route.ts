import dbConnect from "@/lib/mongodb";
import Exercise from "@/models/Exercise";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const exercise = await Exercise.create(body);
    return Response.json({ exercise }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { error: "Failed to create exercise", detail: message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const exercises = await Exercise.find({}).lean();
    const normalized = exercises.map((ex) => ({
      ...ex,
      bodyPart: Array.isArray(ex.bodyPart)
        ? (ex.bodyPart[0] ?? "")
        : ex.bodyPart,
    }));
    return Response.json({ exercises: normalized });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error fetching exercises:", error);
    return Response.json(
      { error: "Failed to fetch exercises", detail: message },
      { status: 500 },
    );
  }
}
