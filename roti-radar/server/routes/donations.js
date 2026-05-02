const express = require('express');
const Donation = require('../models/Donation');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, pickupAddress, quantity, availableUntil } = req.body;

    if (!title || !description || !pickupAddress || !quantity || !availableUntil) {
      return res.status(400).json({ message: 'Please fill all donation fields.' });
    }

    const donation = await Donation.create({
      title,
      description,
      pickupAddress,
      quantity,
      availableUntil,
      donor: req.user._id,
    });

    res.status(201).json({ donation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create donation.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'open' })
      .sort({ createdAt: -1 })
      .populate('donor', 'name role');
    res.json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to retrieve donations.' });
  }
});

router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
    res.json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to retrieve your donations.' });
  }
});

module.exports = router;
