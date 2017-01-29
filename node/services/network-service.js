var request = require("request");

var networkService = new function() {
  
  this.post = function(data, url, callback) {
    request.post({
      url: url, 
      body : data}, callback);   
  }
}
exports.service = networkService;