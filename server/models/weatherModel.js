const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  lokasi: String,
  kondisi: String,
  suhu: Number,
  kelembapan: Number,   
  angin: Number,        
  curahHujan: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);