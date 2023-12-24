const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ocrRoutes = require('./routes/ocrRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
// Use routes
app.use('/', ocrRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
