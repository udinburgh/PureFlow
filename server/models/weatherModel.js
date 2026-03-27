const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  lokasi: String,
  kondisi: String,
  suhu: Number,
  curahHujan: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);