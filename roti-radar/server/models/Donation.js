const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    pickupAddress: { type: String, required: true, trim: true },
    quantity: { type: String, required: true, trim: true },
    availableUntil: { type: Date, required: true },
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open', 'claimed', 'completed'], default: 'open' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donation', donationSchema);
