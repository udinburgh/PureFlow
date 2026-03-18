const express = require('express');
const router = express.Router();
const debitController = require('../controllers/debitController');

// POST data debit
router.post('/', debitController.hitungDebit);

// GET statistik
router.get('/statistik', debitController.getStatistik);

module.exports = router;