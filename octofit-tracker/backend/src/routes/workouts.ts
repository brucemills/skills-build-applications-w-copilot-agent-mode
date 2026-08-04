import { Router } from 'express';
import WorkoutModel from '../models/workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response) => {
  try {
    const workouts = await WorkoutModel.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();

    response.json({
      resource: 'workouts',
      status: 'ok',
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'workouts',
      status: 'error',
      message: 'Failed to fetch workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default workoutsRouter;