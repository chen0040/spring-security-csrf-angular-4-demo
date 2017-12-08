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

    SpringBootClient.prototype.getJsonSecured = function(url, callback) {

        axios({
            method: 'get',
            url: url,
            responseType: 'json',
            headers: {
                '_csrf': this._csrf,
                'Cookie': 'XSRF-TOKEN=' + this._csrf + ';JSESSIONID=' + this.sessionId,
                'X-XSRF-TOKEN': this._csrf
            }
        }).then(function(response){
            callback(response.data);
        });
    };

    SpringBootClient.prototype.login = function (url, username, password, callback) {
        var that = this;
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
                          '_csrf': that._csrf,
                          'Cookie': 'XSRF-TOKEN=' + that._csrf,
                          'X-XSRF-TOKEN': that._csrf
            }
                  }).then(function(response){
                      var result = response.data;
                      that.authenticated = result.authenticated;
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
                                      that.sessionId = value;
                                      callback(that._csrf, that.sessionId, that.authenticated);
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
        var that = this;
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
                            that._csrf = value;
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