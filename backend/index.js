const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;
const upload = multer();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });