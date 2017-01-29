 var login = require('./login-service');
 var network = require('./network-service');

var loginService = login.service;
var networkService = network.service;

 var appService = new function() {
   
   this.loginUser = function(type, token, redirectUri) {
     if (type == "steam") {
       return loginService.steamLogin(token, redirectUri);
     } else if (type == "xbox") {
       return loginService.xboxLogin(token, redirectUri);
     }
   }
   
   this.getXboxToken = function(authcode, clientId, clientSecret, redirectUri, accountLinkingToken)
   {
     var msRedirectUri = 'https://botterboy-kmohanraj217229.codeanyapp.com/loginreturn?service=xbox&token=' + accountLinkingToken + '&redirect_uri=' + redirectUri;
     var queryString = "client_id=" + clientId + "&grant_type=authorization_code&client_secret=" + clientSecret + "&code=" + authcode + "&redirect_uri=" + msRedirectUri;
     
     var responseJson = "";
     
     networkService.post("https://login.live.com/oauth20_token.srf", queryString, function(error, response, body){
       responseJson = response;
     });
     
     //return responseJson;
   }
   
 }

 exports.service = appService;