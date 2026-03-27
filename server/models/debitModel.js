const mongoose = require('mongoose');

const debitSchema = new mongoose.Schema({
  volume: Number,
  waktu: Number,
  debit: Number,
  lokasi: {
    type: String,
    default: "Unknown" // kalau user tidak isi lokasi
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Debit', debitSchema);