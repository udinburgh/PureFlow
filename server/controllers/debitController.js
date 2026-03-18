// logika perhitungan debit
exports.hitungDebit = (req, res) => {
  const { volume, waktu } = req.body;
  const debit = volume / waktu;
  res.json({ debit, status: 'ok' });
};

// logika statistik (dummy dulu)
exports.getStatistik = (req, res) => {
  res.json({
    rataDebit: 15,
    totalData: 100,
    lokasi: ['Pesanggrahan', 'Jakarta Selatan']
  });
};