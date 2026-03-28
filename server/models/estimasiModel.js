const mongoose = require('mongoose');

const estimasiSchema = new mongoose.Schema({
  jenisAlat: String,
  durasi: Number,
  konsumsi: Number,
  satuan: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Estimasi', estimasiSchema);