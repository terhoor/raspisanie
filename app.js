const express = require('express');
const dataRoutes = require('./routes/data');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/data', dataRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  });
}

module.exports = app;