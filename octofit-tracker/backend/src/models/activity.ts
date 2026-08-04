import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: ['run', 'ride', 'swim', 'strength', 'yoga', 'hiit'],
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 10 },
    distanceKm: { type: Number, min: 0 },
    completedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = model('Activity', activitySchema);

export default ActivityModel;
