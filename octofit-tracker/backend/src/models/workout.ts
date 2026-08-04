import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focus: {
      type: String,
      required: true,
      enum: ['strength', 'cardio', 'mobility', 'endurance'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, required: true, trim: true }],
    instructions: [{ type: String, required: true, trim: true }],
  },
  {
    timestamps: true,
  },
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model('Workout', workoutSchema);

export default WorkoutModel;
