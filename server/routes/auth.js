const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  
  // const userId = req.params.userId;

  // User.findOne({ _id: userId })
  //       .then( user => {
  //           if (!user) {
  //               return res.status(404).json({
  //                   'status': 'Success',
  //                   'message': 'No User found with that Id!',
  //                   'user': user
  //               })}
  //               res.send(user);
  //       })
  //       .catch( error => {
  //               res.status(500).json({
  //                   'status': 'Error',
  //                   'message': 'Error in Database Operation!',
  //                   'error': error
  //       })});
    // console.log(req.user);
    if (req.user) {
        res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        // cookies: req.cookies
        });
    }
    res.send(req.user)
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", 'email'] }));
router.get( "/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
}));

router.get("/github", passport.authenticate("github", { scope: ["profile", 'email'] }));
router.get( "/github/callback", passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed", 
}));

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", 'email'] }));
router.get( "/facebook/callback", passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed", 
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
    failureFlash: true
}));

module.exports = router