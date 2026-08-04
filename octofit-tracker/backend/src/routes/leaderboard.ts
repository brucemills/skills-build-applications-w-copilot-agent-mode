import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  try {
    const entries = await LeaderboardModel.find()
      .populate('user', 'name fitnessLevel')
      .populate('team', 'name city')
      .sort({ period: 1, rank: 1 })
      .lean();

    response.json({
      resource: 'leaderboard',
      status: 'ok',
      count: entries.length,
      entries,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'leaderboard',
      status: 'error',
      message: 'Failed to fetch leaderboard entries',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default leaderboardRouter;