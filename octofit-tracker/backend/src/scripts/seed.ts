import mongoose from 'mongoose';
import ActivityModel from '../models/activity.js';
import LeaderboardModel from '../models/leaderboard.js';
import TeamModel from '../models/team.js';
import UserModel from '../models/user.js';
import WorkoutModel from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const teams = await TeamModel.insertMany([
      {
        name: 'Summit Sprinters',
        city: 'Denver',
        motto: 'Fast feet, strong lungs',
      },
      {
        name: 'Harbor Hustle',
        city: 'Seattle',
        motto: 'Rain or shine, we train',
      },
      {
        name: 'Metro Momentum',
        city: 'Chicago',
        motto: 'Consistency beats intensity',
      },
    ]);

    const users = await UserModel.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@octofit.local',
        age: 29,
        fitnessLevel: 'advanced',
        goals: ['Half-marathon PR', 'Improve VO2 max'],
        team: teams[0]._id,
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@octofit.local',
        age: 34,
        fitnessLevel: 'intermediate',
        goals: ['Lose 10 lbs', 'Train 4x weekly'],
        team: teams[1]._id,
      },
      {
        name: 'Mia Gonzalez',
        email: 'mia.gonzalez@octofit.local',
        age: 26,
        fitnessLevel: 'intermediate',
        goals: ['Build total-body strength', 'Consistency streak'],
        team: teams[2]._id,
      },
      {
        name: 'Liam Johnson',
        email: 'liam.johnson@octofit.local',
        age: 31,
        fitnessLevel: 'beginner',
        goals: ['Complete first 5K', 'Better mobility'],
        team: teams[0]._id,
      },
      {
        name: 'Sofia Rossi',
        email: 'sofia.rossi@octofit.local',
        age: 38,
        fitnessLevel: 'advanced',
        goals: ['Master kettlebell snatch', 'Weekly active recovery'],
        team: teams[1]._id,
      },
      {
        name: 'Ethan Nguyen',
        email: 'ethan.nguyen@octofit.local',
        age: 24,
        fitnessLevel: 'beginner',
        goals: ['Gain endurance', 'Cycle 50 km'],
        team: teams[2]._id,
      },
    ]);

    await TeamModel.bulkWrite([
      {
        updateOne: {
          filter: { _id: teams[0]._id },
          update: {
            captain: users[0]._id,
            members: [users[0]._id, users[3]._id],
          },
        },
      },
      {
        updateOne: {
          filter: { _id: teams[1]._id },
          update: {
            captain: users[4]._id,
            members: [users[1]._id, users[4]._id],
          },
        },
      },
      {
        updateOne: {
          filter: { _id: teams[2]._id },
          update: {
            captain: users[2]._id,
            members: [users[2]._id, users[5]._id],
          },
        },
      },
    ]);

    await ActivityModel.insertMany([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 610,
        distanceKm: 10.4,
        completedAt: new Date('2026-07-28T06:30:00.000Z'),
      },
      {
        user: users[3]._id,
        type: 'yoga',
        durationMinutes: 40,
        caloriesBurned: 210,
        completedAt: new Date('2026-07-29T18:15:00.000Z'),
      },
      {
        user: users[1]._id,
        type: 'ride',
        durationMinutes: 70,
        caloriesBurned: 780,
        distanceKm: 24.3,
        completedAt: new Date('2026-07-30T12:00:00.000Z'),
      },
      {
        user: users[4]._id,
        type: 'strength',
        durationMinutes: 55,
        caloriesBurned: 520,
        completedAt: new Date('2026-07-31T07:45:00.000Z'),
      },
      {
        user: users[2]._id,
        type: 'hiit',
        durationMinutes: 35,
        caloriesBurned: 430,
        completedAt: new Date('2026-08-01T17:20:00.000Z'),
      },
      {
        user: users[5]._id,
        type: 'swim',
        durationMinutes: 45,
        caloriesBurned: 390,
        distanceKm: 1.2,
        completedAt: new Date('2026-08-02T09:10:00.000Z'),
      },
    ]);

    await LeaderboardModel.insertMany([
      {
        period: 'weekly',
        user: users[0]._id,
        team: teams[0]._id,
        points: 920,
        rank: 1,
        updatedAt: new Date('2026-08-03T00:00:00.000Z'),
      },
      {
        period: 'weekly',
        user: users[4]._id,
        team: teams[1]._id,
        points: 870,
        rank: 2,
        updatedAt: new Date('2026-08-03T00:00:00.000Z'),
      },
      {
        period: 'weekly',
        user: users[2]._id,
        team: teams[2]._id,
        points: 845,
        rank: 3,
        updatedAt: new Date('2026-08-03T00:00:00.000Z'),
      },
      {
        period: 'monthly',
        user: users[1]._id,
        team: teams[1]._id,
        points: 3400,
        rank: 1,
        updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      },
      {
        period: 'monthly',
        user: users[0]._id,
        team: teams[0]._id,
        points: 3320,
        rank: 2,
        updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      },
      {
        period: 'monthly',
        user: users[4]._id,
        team: teams[1]._id,
        points: 3260,
        rank: 3,
        updatedAt: new Date('2026-08-01T00:00:00.000Z'),
      },
    ]);

    await WorkoutModel.insertMany([
      {
        title: 'Starter Strength Circuit',
        focus: 'strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        equipment: ['Dumbbells', 'Exercise mat'],
        instructions: ['3 rounds', '12 goblet squats', '10 pushups', '30-second plank'],
      },
      {
        title: 'Tempo Run Builder',
        focus: 'cardio',
        difficulty: 'intermediate',
        durationMinutes: 45,
        equipment: ['Running shoes', 'Watch'],
        instructions: ['10-minute warmup jog', '20-minute tempo pace', '15-minute cooldown'],
      },
      {
        title: 'Mobility Reset Flow',
        focus: 'mobility',
        difficulty: 'beginner',
        durationMinutes: 25,
        equipment: ['Yoga mat', 'Foam roller'],
        instructions: ['Hip openers', 'Thoracic rotations', 'Hamstring flossing', 'Breathing cooldown'],
      },
      {
        title: 'Hill Repeat Power Session',
        focus: 'endurance',
        difficulty: 'advanced',
        durationMinutes: 60,
        equipment: ['Running shoes'],
        instructions: ['15-minute warmup', '8 x 90-second uphill repeats', 'Walk-jog recovery', 'Cooldown jog'],
      },
      {
        title: 'Kettlebell Conditioning Ladder',
        focus: 'strength',
        difficulty: 'advanced',
        durationMinutes: 40,
        equipment: ['Kettlebell'],
        instructions: ['10 to 1 rep ladder', 'Swings + cleans + presses', '90-second rest between sets'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
