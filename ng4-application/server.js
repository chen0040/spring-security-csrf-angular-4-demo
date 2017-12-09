// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const sbjclient = require('../spring-boot-js-client/src/sbjclient');


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.post('/login', (req, res) => {
  var url = 'http://localhost:8080/erp/login-api-json';
  var loginObj = req.body;
  var username = loginObj.username;
  var password = loginObj.password;

  var cl = new sbjclient.SpringBootClient();
  cl.login(url, username, password, function(_csrf, _sessionId, authenticated){
    console.log('authenticated: ' + authenticated);
    console.log('_csrf: ' + _csrf);
    console.log('JSESSIONID: ' + _sessionId);
    res.send({
      authenticated: authenticated,
      _csrf: _csrf,
      sessionId: _sessionId
    });
  });
});

app.get('/account', (req, res) => {
  var url = 'http://localhost:8080/users/get-account';

  var cl = new sbjclient.SpringBootClient();
  cl._csrf = req.header('_csrf');
  cl.sessionId = req.header('JSESSIONID');

  console.log('getting account ...');
  console.log('_csrf: ' + cl._csrf);
  console.log('sessionId: ' + cl.sessionId);

  cl.getJsonSecured(url, function (account) {
    res.send(account);
  });
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Angular4 server running on localhost:${port}`));
