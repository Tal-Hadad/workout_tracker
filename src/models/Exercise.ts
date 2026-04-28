import mongoose, { Schema, models } from "mongoose";

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    set: (v: string) => v.charAt(0).toUpperCase() + v.slice(1),
  },
  bodyPart: {
    type: [String],
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
    set: (v: unknown) => {
      if (Array.isArray(v)) {
        return v.map(
          (item: string) => item.charAt(0).toUpperCase() + item.slice(1),
        );
      }
      return typeof v === "string" ? v.charAt(0).toUpperCase() + v.slice(1) : v;
    },
  },
  category: {
    type: String,
    enum: [
      "Barbell",
      "Dumbbell",
      "Machine/Other",
      "Bodyweight",
      "Assisted Bodywight",
      "Cardio",
    ],
    trim: true,
    set: (v: string) => v.charAt(0).toUpperCase() + v.slice(1),
  },
});

const Exercise = models.Exercise || mongoose.model("Exercise", ExerciseSchema);

export default Exercise;
