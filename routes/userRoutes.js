const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History'); 

router.get('/', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

router.get('/summary', async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalClaims = await History.countDocuments();
  const totalPointsResult = await History.aggregate([
    { $group: { _id: null, totalPoints: { $sum: "$points" } } }
  ]);
  const totalPoints = totalPointsResult[0]?.totalPoints || 0;

  res.json({ totalUsers, totalClaims, totalPoints });
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.json(user);
});

module.exports = router;