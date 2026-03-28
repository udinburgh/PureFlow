const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // import mongoose

const debitRoutes = require('./routes/debitRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// koneksi ke MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pureflow')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// route default untuk root path "/"
app.get('/', (req, res) => {
  res.json({
    status: 'Backend PureFlow Aktif!',
    server: `http://localhost:${PORT}`,
    waktu: new Date().toLocaleString()
  });
});

// gunakan routes untuk debit
app.use('/api', debitRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});