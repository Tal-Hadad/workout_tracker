import mongoose, { Schema, models } from "mongoose";

const SetSchema = new Schema(
  {
    reps: { type: String, default: "" },
    weight: { type: String, default: "" },
  },
  { _id: false }
);

const EntrySchema = new Schema(
  {
    exerciseName: { type: String, required: true },
    sets: { type: [SetSchema], default: [] },
  },
  { _id: false }
);

const WorkoutHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    durationSeconds: { type: Number, required: true, min: 0 },
    entries: { type: [EntrySchema], default: [] },
  },
  { timestamps: true }
);

WorkoutHistorySchema.index({ userId: 1, createdAt: -1 });

const WorkoutHistory =
  models.WorkoutHistory ||
  mongoose.model("WorkoutHistory", WorkoutHistorySchema);

export default WorkoutHistory;
