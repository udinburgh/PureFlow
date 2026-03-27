const express = require('express');
const router = express.Router();
const debitController = require('../controllers/debitController');

// POST data debit
router.post('/', debitController.hitungDebit);

// GET statistik
router.get('/statistik', debitController.getStatistik);

// POST estimasi konsumsi air
router.post('/estimasi', debitController.hitungAir);

// GET weather data
router.get('/weather', debitController.getWeather);

module.exports = router;