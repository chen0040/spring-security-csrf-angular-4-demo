var jssb = jssb || {};

if(require){
    axios = require('axios');
}

(function (jss) {



    var SpringBootClient = function() {
        this._csrf = null;
        this.sessionId = null;
        this.authenticated = false;
    };

    SpringBootClient.prototype.login = function (url, username, password, callback) {
        this.loginGet(url, (function(_username, _password){
            return function(_url){
                  axios({
                      method: 'post',
                      url: _url,
                      responseType: 'json',
                      data: {
                          username: _username,
                          password: _password
                      },
                      headers: {
                          '_csrf': this._csrf,
                          'Cookie': 'XSRF-TOKEN=' + this._csrf,
                          'X-XSRF-TOKEN': this._csrf
            }
                  }).then(function(response){
                      var result = response.data;
                      this.authenticated = result.authenticated;
                      if(result.authenticated) {
                          var cookie = response.headers['set-cookie'][0];
                          var cookies = cookie.split(';');
                          for(var i=0; i < cookies.length; ++i){
                              var c = cookies[i];
                              var cpair = c.split('=');
                              if(cpair.length === 2) {
                                  var name = cpair[0];
                                  var value = cpair[1];
                                  if(name === 'JSESSIONID') {
                                      this.sessionId = value;
                                      callback(this._csrf, this.sessionId, this.authenticated);
                                      break;
                                  }
                              }
                          }
                      } else {

                          callback('', '', false);
                      }
                  });
            };
        })(username, password));
    };

    SpringBootClient.prototype.loginGet = function(url, callback) {
        axios({
            method:'get',
            url:url,
            responseType:'json'
        })
            .then(function(response) {

                var cookie = response.headers['set-cookie'][0];
                var cookies = cookie.split(';');
                for(var i=0; i < cookies.length; ++i){
                    var c = cookies[i];
                    var cpair = c.split('=');
                    if(cpair.length === 2) {
                        var name = cpair[0];
                        var value = cpair[1];
                        if(name === 'XSRF-TOKEN') {
                            this._csrf = value;
                            callback(url);
                            break;
                        }
                    }
                }
            });
    };



    jss.SpringBootClient = SpringBootClient;

})(jssb);

var module = module || {};
if(module) {
    module.exports = jssb;
}