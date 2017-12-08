var jssb = jssb || {};

(function (jss) {

    jss.copyArray = function(a) {
        var b = [];
        for (var i = 0; i < a.length; ++i) {
            b.push(a[i]);
        }
        return b;
    };

    jss.copyMap = function(a) {
        var b = {};
        for (var key in a) {
            b[key] = a[key];
        }
        return b;
    };

    var SpringBootClient = function() {
        this.token = null;
        this.sessionId = null;
    };

    SpringBootClient.prototype.login = function (url, username, password) {

    };

    jss.SpringBootClient = SpringBootClient;

})(jssb);

var module = module || {};
if(module) {
    module.exports = jssb;
}