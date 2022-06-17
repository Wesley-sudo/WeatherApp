const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user
    });
  }
  else {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: null
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect(CLIENT_URL);
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", 'email'], prompt: "select_account" }));
router.get( "/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
}));

router.get("/github", passport.authenticate("github", { scope: ["profile", 'email'], prompt: "select_account" }));
router.get( "/github/callback", passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed", 
}));

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", 'email'], prompt: "select_account" }));
router.get( "/facebook/callback", passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed", 
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: CLIENT_URL,
    failureRedirect: 'http://localhost:3000/signup',
    failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: CLIENT_URL,
    failureRedirect: 'http://localhost:3000/login',
    failureFlash: true
}));

module.exports = router