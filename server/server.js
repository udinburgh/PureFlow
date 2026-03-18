const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const debitRoutes = require('./routes/debitRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// gunakan routes
app.use('/api/debit', debitRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});