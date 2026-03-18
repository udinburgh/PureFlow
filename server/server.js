const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const debitRoutes = require('./routes/debitRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// route default untuk root path "/"
app.get('/', (req, res) => {
  res.json({
    status: 'Backend PureFlow Aktif!',
    server: `http://localhost:${PORT}`,
    waktu: new Date().toLocaleString()
  });
});

// gunakan routes untuk debit
app.use('/api/debit', debitRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});