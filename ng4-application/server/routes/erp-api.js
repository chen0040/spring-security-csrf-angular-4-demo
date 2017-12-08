const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');

// spring-erp server
const API = 'http://localhost:8080/erp';

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
    url: API + '/login-api-json',
    data: req.body
  }).then(function(response){
    res.send(response.data);
  });
});

router.post('/accounts', (req, res) => {
  axios({
    method: 'post',
    url: API + '/accounts',
    data: req.body
  }).then(function(response) {
    res.send(response.data);
  });
});

/* API working with categories. */

var category_get_apis = ['top-categories', 'categories', 'products']

for(var i=0; i < category_get_apis.length; ++i) {
  var api_name = category_get_apis[i];
  router.get('/' + api_name, (req, res) => {
    getJson(API+'/' + api_name, req, res);
  });
}

router.get('/categories/:categoryId', (req, res) => {
  var categoryId = req.params.categoryId;
  axios({
    method: 'get',
    url: API + '/categories/' + categoryId
  }).then((response) => {
    res.send(response.data);
  });
});

router.get('/categories/:categoryId/products', (req, res) => {
  var categoryId = req.params.categoryId;
  axios({
    method: 'get',
    url: API + '/categories/' + categoryId
  }).then((response) => {
    res.send(response.data);
  });
});

router.get('/vendors/:vendor/products', (req, res) => {
  var vendor = req.params.vendor;

  axios({
    method: 'get',
    url: API + '/vendors/' + vendor + '/products'
  }).then((response) => {
    res.send(response.data);
  });
});


router.get('/vendors/:vendor/categories/:categoryId/products', (req, res) => {
  var categoryId = req.params.categoryId;
  var vendor = req.params.vendor;

  axios({
    method: 'get',
    url: API + '/vendors/' + vendor + '/categories/' + categoryId + '/products'
  }).then((response) => {
    res.send(response.data);
  });
});

router.post('/categories', (req, res) => {

  // Send a POST request
  axios({
    method: 'post',
    url: API + '/categories',
    data: req.body
  }).function((response) => {
    res.send(response.data);
  });
});

/* API working with products */

router.get('/products/:sku', (req, res) => {
  var sku = req.params.sku;
  axios({
    method: 'get',
    url: API + '/products/' + sku
  }).then((response) => {
    res.send(response.data);
  });
});

router.post('/products', (req, res) => {
  axios({
    method: 'post',
    url: API + '/products',
    data: req.body
  }).then((response) => {
    res.send(response.data);
  });
});

router.delete('/products/:sku', (req, res) => {
  var sku = req.params.sku
  axios({
    method: 'delete',
    url: API + '/products/' + sku
  }).then(response => {
    res.send(response.data);
  });
});

router.get('/new-product', (req, res) => {
  var username = encodeURIComponent(req.query.username);
  axios({
    method: 'get',
    url: API + '/new-product?username=' + username
  }).then((response) => {
    res.send(response.data);
  });
});

router.get('/products/:sku/categories', (req, res) => {
  var sku = req.params.sku;
  axios({
    method: 'get',
    url: API + '/products/' + sku + '/categories'
  }).then((response) => {
    res.send(response.data);
  });
});


router.get('/add-product-to-category', (req, res) => {
  var vendor = encodeURIComponent(req.query.vendor);
  var categoryId = req.query.categoryId;
  var sku = encodeURIComponent(req.query.sku);

  axios({
    method: 'get',
    url: API + '/add-product-to-category?vendor=' + vendor + '&sku=' + sku + '&categoryId=' + categoryId
  }).then((response) => {
    res.send(response.data);
  });
});

router.get('/remove-product-from-category', (req, res) => {
  var categoryId = req.query.categoryId;
  var sku = encodeURIComponent(req.query.sku);
  axios({
    method: 'get',
    url: API + '/remove-product-from-category?sku=' + sku + '&categoryId=' + categoryId
  }).then((response) => {
    res.send(response.data);
  });
});


module.exports = router;
