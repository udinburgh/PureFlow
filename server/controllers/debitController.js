const Debit = require('../models/debitModel');
const Estimasi = require('../models/estimasiModel');
const Weather = require('../models/weatherModel');
const axios = require('axios'); // untuk fetch Weather API
const apiKey = '2b8de4d0ea57a3a3ecac78023750e757'; // API key asli

// GET: Weather API (contoh pakai OpenWeather)
exports.getWeather = async (req, res) => {
  try {
    const { lokasi } = req.query; // contoh: ?lokasi=Jakarta

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${lokasi}&appid=${apiKey}&units=metric`
    );

    const data = response.data;
    const hasil = {
      lokasi: data.name,
      kondisi: data.weather[0].description,
      suhu: data.main.temp,
      curahHujan: data.rain ? data.rain['1h'] : 0
    };

    res.json(hasil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// POST: hitung debit + simpan ke DB
exports.hitungDebit = async (req, res) => {
  try {
    const { volume, waktu, lokasi } = req.body;

    // ✅ Validasi input
    if (!volume || !waktu || waktu <= 0) {
      return res.status(400).json({ error: 'Input tidak valid' });
    }

    const debit = volume / waktu;

    const newData = new Debit({ volume, waktu, debit, lokasi });
    await newData.save();

    res.json({ debit, status: 'ok', saved: true, lokasi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: ambil semua data dari DB + statistik per lokasi
exports.getStatistik = async (req, res) => {
  try {
    const data = await Debit.find();

    const rataDebit = data.length > 0
      ? data.reduce((sum, d) => sum + d.debit, 0) / data.length
      : 0;

    // hitung statistik per lokasi
    const statistikLokasi = {};
    data.forEach(d => {
      const loc = d.lokasi || "Unknown";
      if (!statistikLokasi[loc]) {
        statistikLokasi[loc] = { total: 0, sum: 0 };
      }
      statistikLokasi[loc].total++;
      statistikLokasi[loc].sum += d.debit;
    });

    const hasilLokasi = Object.keys(statistikLokasi).map(l => ({
      lokasi: l,
      totalData: statistikLokasi[l].total,
      rataDebit: statistikLokasi[l].sum / statistikLokasi[l].total
    }));

    res.json({
      totalData: data.length,
      rataDebit,
      perLokasi: hasilLokasi,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: estimasi konsumsi air (keran/shower)
exports.hitungAir = (req, res) => {
  try {
    const { durasi, jenisAlat } = req.body;

    if (!durasi || durasi <= 0 || !jenisAlat) {
      return res.status(400).json({ error: 'Input tidak valid' });
    }

    const debitMap = { keran: 6, shower: 10 }; // liter per menit
    const debitAlat = debitMap[jenisAlat.toLowerCase()];

    if (!debitAlat) {
      return res.status(400).json({ error: 'Jenis alat tidak dikenali' });
    }

    const konsumsi = durasi * debitAlat;
    res.json({ konsumsi, satuan: 'liter', jenisAlat, durasi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Weather API (contoh pakai OpenWeather)
exports.getWeather = async (req, res) => {
  try {
    const { lokasi } = req.query; // contoh: ?lokasi=Jakarta
    const apiKey = '2b8de4d0ea57a3a3ecac78023750e757'; // API key asli

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${lokasi}&appid=${apiKey}&units=metric`
    );

    const data = response.data;
    const hasil = {
      lokasi: data.name,
      kondisi: data.weather[0].description,
      suhu: data.main.temp,
      curahHujan: data.rain ? data.rain['1h'] : 0
    };

    res.json(hasil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};