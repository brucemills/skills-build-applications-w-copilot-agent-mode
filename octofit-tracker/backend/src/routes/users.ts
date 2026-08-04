import { Router } from 'express';
import UserModel from '../models/user.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  try {
    const users = await UserModel.find()
      .populate('team', 'name city')
      .sort({ createdAt: 1 })
      .lean();

    response.json({
      resource: 'users',
      status: 'ok',
      count: users.length,
      users,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'users',
      status: 'error',
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default usersRouter;