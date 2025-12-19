const Newsletter = require('../models/Newsletter');

exports.getSubscribers = async (req, res) => {
  const list = await Newsletter.find().sort({ createdAt: -1 });
  res.json(list);
};

exports.subscribe = async (req, res) => {
  const exists = await Newsletter.findOne({ email: req.body.email });
  if (exists) return res.status(400).json({ error: 'Already subscribed' });

  const sub = await Newsletter.create({ email: req.body.email });
  res.status(201).json(sub);
};
