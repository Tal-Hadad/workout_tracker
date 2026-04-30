import mongoose, { Schema, models } from "mongoose";

const ExerciseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    set: (v: string) => v.replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  bodyPart: {
    type: String,
    enum: [
      "Chest",
      "Back",
      "Legs",
      "Shoulders",
      "Biceps",
      "Triceps",
      "Core",
      "Full Body",
      "Other",
    ],
    trim: true,
    set: (v: string) => v.charAt(0).toUpperCase() + v.slice(1),
  },
  category: {
    type: String,
    enum: [
      "Barbell",
      "Dumbbell",
      "Cable",
      "Machine/Other",
      "Bodyweight",
      "Assisted Bodywight",
      "Cardio",
    ],
    trim: true,
    set: (v: string) => v.charAt(0).toUpperCase() + v.slice(1),
  },
});

ExerciseSchema.index({ name: 1, category: 1 }, { unique: true });

const Exercise = models.Exercise || mongoose.model("Exercise", ExerciseSchema);

export default Exercise;
