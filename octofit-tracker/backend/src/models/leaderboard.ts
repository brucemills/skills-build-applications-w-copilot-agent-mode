import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, enum: ['weekly', 'monthly'] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    updatedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
