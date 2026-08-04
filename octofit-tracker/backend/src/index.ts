import express from 'express';

import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    service: 'octofit-tracker-backend',
    port,
    database: db.readyState === 1 ? 'connected' : 'connecting',
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});