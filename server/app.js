require('dotenv').config();

const express = require('express');
const axios = require('axios');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

let cache = {};

app.get('/', (req, res) => {
  if (req.query.i) {
    if (cache.hasOwnProperty(req.query.i)) {
      res.json(cache[req.query.i]);
    } else {
      axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${req.query.i}`)
        .then((response) => {
          cache[req.query.i] = response.data;
          res.json(cache[req.query.i]);
        })
        .catch(error => {
          res.status(200).json(cache[req.query.i]);
          console.log(req.query.i);
          console.log(error.response.data);
          console.log(error.response.status);
        });
    }
  } else if (encodeURIComponent(req.query.t)) {
    console.log(req.query.t);
    if (cache.hasOwnProperty(encodeURIComponent(req.query.t))) {
      res.json(cache[encodeURIComponent(req.query.t)]);
    } else {
      axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${encodeURIComponent(req.query.t)}`)
        .then((response) => {
          cache[encodeURIComponent(req.query.t)] = response.data;
          res.json(cache[encodeURIComponent(req.query.t)]);
        })
        .catch(error => {
          res.status(200).json(cache[encodeURIComponent(req.query.t)]);
          console.log(encodeURIComponent(req.query.t));
          console.log(error.response.data);
          console.log(error.response.status);
        });
    }
  }
});

module.exports = app;


