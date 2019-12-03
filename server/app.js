require('dotenv').config();

const express = require('express');
const axios = require('axios');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

let cache = {};

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', (req, res) => {
  axios({
    url: `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDB_API_KEY}`,
    method: 'get'
  })
  .then((response) => {
    res.send(response.data);
  });
});

module.exports = app;