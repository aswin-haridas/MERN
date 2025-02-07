const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const path = require('path')

app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

require('dotenv').config();

mongoose.connect(process.env.mongo_url).then(() => {
  console.log('mongodb connected');
});

const router = require('./routes/note');
app.use('/api', router);

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});


