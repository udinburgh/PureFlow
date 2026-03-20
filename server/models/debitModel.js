const mongoose = require('mongoose');

const debitSchema = new mongoose.Schema({
  volume: Number,
  waktu: Number,
  debit: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Debit', debitSchema);