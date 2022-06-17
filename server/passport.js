const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const passport = require("passport");

const clientCreds = require("./credentials");

passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((user, done) => { 
    User.findById( user, (err, user) => {
        if (err) done(null, false, {error:err});
        else done(null, user);
    }); 
});

passport.use( new GoogleStrategy({
    clientID: clientCreds.Google_CId,
    clientSecret: clientCreds.Google_CSecret,
    callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'local.email' : profile.emails[0].value.toLowerCase() }, function(err, user) {
                if(err) return done(err);
                if(user) return done(null, user)
                else {
                    const newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;

                    newUser.local.email = profile.emails[0].value.toLowerCase();
                    newUser.local.displayName = profile.displayName;
                    newUser.local.name.familyName = profile.name.familyName;
                    newUser.local.name.givenName = profile.name.givenName;
                    newUser.local.location = "N/A";
                    newUser.local.photo = profile.photos[0].value;

                    newUser.save(function(err){
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
}));
  
passport.use( new GithubStrategy({
    clientID: clientCreds.Github_CId,
    clientSecret: clientCreds.Github_CSecret,
    callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'local.email' : profile.emails[0].value.toLowerCase() }, function(err, user) {
                if(err) return done(err);
                if(user) return done(null, user);
                else {
                    const newUser = new User();
                    newUser.github.id = profile.id;
                    newUser.github.token = accessToken;
                    
                    newUser.local.email = profile.emails[0].value.toLowerCase();
                    newUser.local.displayName = profile.displayName;
                    newUser.local.name.givenName = profile._json.name;                    
                    newUser.local.photo = profile.photos[0].value;
                    newUser.local.location = "N/A";

                    newUser.save(function(err){
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
}));

passport.use( new FacebookStrategy({
    clientID: clientCreds.Facebook_CId,
    clientSecret: clientCreds.Facebook_CSecret,
    callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        done(null, profile);
}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local.email': email}, function(err, user){
                console.log(user);
                if(err) return done(err);
                if(user) return done(null, false, req.flash('signupMessage', 'That email already taken'));
                if(!req.user) {
                    const newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.displayName = req.body.displayname;
                    newUser.local.name.givenName = req.body.name;
                    newUser.local.name.familyName = req.body.lastname;
                    newUser.local.location = req.body.location;

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                } else {
                    const user = req.user;
                    user.local.username = email;
                    user.local.password = user.generateHash(password);

                    user.save(function(err){
                        if(err)
                            throw err;
                        return done(null, user);
                    })
                }
            })
        });
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
function(req, email, password, done){
    process.nextTick(function(){
        User.findOne({ 'local.email': email}, function(err, user){
            if(err) return done(err);
            if(!user) return done(null, false, req.flash('loginMessage', 'No User found'));
            if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'invalid password'));
            return done(null, user);
        });
    });
}
));