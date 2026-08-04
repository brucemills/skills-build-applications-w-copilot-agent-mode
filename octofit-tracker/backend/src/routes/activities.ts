import { Router } from 'express';
import ActivityModel from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', 'name email')
      .sort({ completedAt: -1 })
      .lean();

    response.json({
      resource: 'activities',
      status: 'ok',
      count: activities.length,
      activities,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'activities',
      status: 'error',
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default activitiesRouter;