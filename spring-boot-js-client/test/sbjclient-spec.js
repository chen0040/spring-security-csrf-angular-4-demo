var expect    = require("chai").expect;
var sbjclient = require('../src/sbjclient');

describe("Spring Boot Login api test", function() {
  describe("can obtain token and session id if authenticated", function() {
    var url = 'http://localhost:8080/erp/login-api-json';

    var cl = new sbjclient.SpringBootClient();
    cl.login(url, "admin", "admin", function(_csrf, _sessionId, authenticated){
        console.log('authenticated: ' + authenticated);
        console.log('_csrf: ' + _csrf);
        console.log('JSESSIONID: ' + _sessionId);
        expect(authenticated).to.equal(true);
        cl.getJsonSecured('http://localhost:8080/users/get-account', function(account){
            console.log(account);
        });
    });

  });


    describe("cannot obtain token and session id if failed", function() {
        var url = 'http://localhost:8080/erp/login-api-json';

        var cl = new sbjclient.SpringBootClient();
        cl.login(url, "admin", "wrong-password", function(_csrf, _sessionId, authenticated){
            console.log('authenticated: ' + authenticated);
            console.log('_csrf: ' + _csrf);
            console.log('JSESSIONID: ' + _sessionId);
            expect(authenticated).to.equal(false);
        });

    });

});