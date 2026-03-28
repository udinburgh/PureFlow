const express = require('express');
const router = express.Router();
const debitController = require('../controllers/debitController');

// ==========================
// ROUTES
// ==========================

// POST: hitung debit (volume / waktu)
router.post('/', debitController.hitungDebit);

// GET: statistik debit per lokasi
router.get('/statistik', debitController.getStatistik);

// POST: estimasi konsumsi air (durasi & jenis alat)
router.post('/estimasi', debitController.hitungAir);

// GET: weather data dari API eksternal
router.get('/weather', debitController.getWeather);

module.exports = router;