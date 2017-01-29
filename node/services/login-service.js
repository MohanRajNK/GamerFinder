var passport = require('passport'),
  SteamStrategy = require('./../lib/passport-steam/strategy'),
  WindowsStrategy = require('./../lib/passport-windowslive/strategy');


//passport.initialize();
var loginService = new function() {
  
  
  //xbox login
  this.xboxLogin = function(token, redirectUri) {
    passport.use(new WindowsStrategy({
        clientID: "000000004C1C1EEB",
        clientSecret: "XCappi8XSO6hmu9AubpFHhG",
        callbackURL: 'https://botterboy-kmohanraj217229.codeanyapp.com/loginreturn?service=xbox&token=' + token + '&redirect_uri=' + redirectUri
      },
      function(accessToken, refreshToken, profile, cb) {
            console.log("xbox token " + accessToken + " " + profile);
        User.findOrCreate({
          windowsliveId: profile.id
        }, function(err, user) {
          return cb(err, user);
        });
      }
    ));

    return passport.authenticate('windowslive', {
      scope: ['wl.signin', 'wl.basic'], session:false
    }, function(error, user, info) {
      console.log("check authenticate " + error + " " + user + " " + info);
    });
  }

  
  //steam login
  this.steamLogin = function(token, redirectUri) {
    passport.use(new SteamStrategy({
        returnURL: 'https://botterboy-kmohanraj217229.codeanyapp.com/loginreturn?service=steam&token=' + token + "&redirect_uri=" + redirectUri,
        realm: 'https://botterboy-kmohanraj217229.codeanyapp.com/',
        apiKey: '6A0A2593A435D27A387A623B76BF2BF0'
      },
      function(identifier, profile, done) {
      console.log(identifier + " " + profile);
        User.findByOpenID({
          openId: identifier
        }, function(err, user) {
          return done(err, user);
        });
      }
    ));

    return passport.authenticate('steam', {
        failureRedirect: '/',
        session: false
      },
      function(error, user, info) {
      console.log("check authenticate " + error + " " + user + " " + info);
      });

  }
}

exports.service = loginService;