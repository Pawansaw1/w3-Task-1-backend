const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');

router.post('/', async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;
  const user = await User.findById(userId);
  if (!user) return res.status(404).send('User not found');

  user.totalPoints += points;
  await user.save();

  const history = new History({ userId, points });
  await history.save();

  const users = await User.find().sort({ totalPoints: -1 });
  res.json({ points, users });
});

router.get('/history', async (req, res) => {
  const data = await History.find().sort({ timestamp: -1 }).limit(10).populate('userId');
  const history = data.map(h => ({
    user: { name: h.userId?.name },
    points: h.points,
    timestamp: h.timestamp,
  }));
  res.json(history);
});


module.exports = router;