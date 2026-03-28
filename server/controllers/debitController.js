const Debit = require('../models/debitModel');
const axios = require('axios');
const apiKey = '2b8de4d0ea57a3a3ecac78023750e757';

// GET: Weather API
exports.getWeather = async (req, res) => {
  try {
    const { lokasi } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${lokasi}&appid=${apiKey}&units=metric`
    );
    const data = response.data;
    res.json({
      lokasi: data.name,
      kondisi: data.weather[0].description,
      suhu: data.main.temp,
      kelembapan: data.main.humidity,   
      angin: data.wind.speed,           
      curahHujan: data.rain ? data.rain['1h'] : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: hitung debit
exports.hitungDebit = async (req, res) => {
  try {
    const { volume, waktu, lokasi } = req.body;
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

// GET: statistik
exports.getStatistik = async (req, res) => {
  try {
    const data = await Debit.find();
    const rataDebit = data.length > 0
      ? data.reduce((sum, d) => sum + d.debit, 0) / data.length
      : 0;

    const statistikLokasi = {};
    data.forEach(d => {
      const loc = d.lokasi || "Unknown";
      if (!statistikLokasi[loc]) statistikLokasi[loc] = { total: 0, sum: 0 };
      statistikLokasi[loc].total++;
      statistikLokasi[loc].sum += d.debit;
    });

    const hasilLokasi = Object.keys(statistikLokasi).map(l => ({
      lokasi: l,
      totalData: statistikLokasi[l].total,
      rataDebit: statistikLokasi[l].sum / statistikLokasi[l].total
    }));

    res.json({ totalData: data.length, rataDebit, perLokasi: hasilLokasi, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: estimasi konsumsi air
exports.hitungAir = (req, res) => {
  try {
    const { durasi, jenisAlat } = req.body;
    if (!durasi || durasi <= 0 || !jenisAlat) {
      return res.status(400).json({ error: 'Input tidak valid' });
    }

    const debitMap = {
      "keran hemat air": 6,
      "keran standar": 9,
      "shower": 12,
      "mesin cuci": 15,
      "dispenser": 5,
      "sprinkler": 20
    };

    const key = jenisAlat.toLowerCase();
    const debitAlat = debitMap[key];
    if (!debitAlat) {
      return res.status(400).json({ error: 'Jenis alat tidak dikenali' });
    }

    const konsumsi = durasi * debitAlat;
    res.json({ konsumsi, satuan: 'liter', jenisAlat, durasi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};