import { Router } from 'express';
import TeamModel from '../models/team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  try {
    const teams = await TeamModel.find()
      .populate('captain', 'name email')
      .populate('members', 'name fitnessLevel')
      .sort({ name: 1 })
      .lean();

    response.json({
      resource: 'teams',
      status: 'ok',
      count: teams.length,
      teams,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'teams',
      status: 'error',
      message: 'Failed to fetch teams',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default teamsRouter;