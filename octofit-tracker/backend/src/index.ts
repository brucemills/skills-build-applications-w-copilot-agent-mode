import express from 'express';

import baseUrl from './config/baseUrl.js';
import db from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = 8000;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    service: 'octofit-tracker-backend',
    port,
    baseUrl,
    apiRoot: `${baseUrl}/api`,
    database: db.readyState === 1 ? 'connected' : 'connecting',
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on ${baseUrl}`);
});