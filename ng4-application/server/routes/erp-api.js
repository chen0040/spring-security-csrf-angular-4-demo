const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');

// spring-erp server
const API = 'http://localhost:8080';

function getJson(url, req, res) {
  axios({
      method:'get',
      url: url,
      responseType: 'json'
  })
  .then(function(response) {
      res.send(response.data);
  });
}

/* API working with authentication and accounts */

router.post('/login-api-json', (req, res) => {
  axios({
    method: 'post',
    url: API + '/erp/login-api-json',
    data: req.body
  }).then(function(response){
    res.send(response.data);
  });
});

router.get('/accounts', (req, res) => {
  axios({
    method: 'get',
    url: API + '/accounts',
    data: req.body
  }).then(function(response) {
    res.send(response.data);
  });
});




module.exports = router;
