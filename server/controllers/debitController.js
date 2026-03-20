const Debit = require('../models/debitModel');

// POST: hitung debit + simpan ke DB
exports.hitungDebit = async (req, res) => {
  try {
    const { volume, waktu } = req.body;

    // ✅ Validasi input
    if (!volume || !waktu || waktu <= 0) {
      return res.status(400).json({ error: 'Input tidak valid' });
    }

    const debit = volume / waktu;

    const newData = new Debit({ volume, waktu, debit });
    await newData.save();

    res.json({ debit, status: 'ok', saved: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: ambil semua data dari DB
exports.getStatistik = async (req, res) => {
  try {
    const data = await Debit.find();

    res.json({
      totalData: data.length,
      rataDebit: data.length > 0 
        ? data.reduce((sum, d) => sum + d.debit, 0) / data.length 
        : 0, // aman kalau data kosong
      lokasi: ["Pesanggrahan", "Jakarta Selatan"], // tambahan custom
      data // tampilkan isi dokumen juga
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};