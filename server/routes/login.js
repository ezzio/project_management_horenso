var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const functionAutho = require("../public/javascripts/CheckAutho");
const login = require("../public/db/User_Schema");
router.get("/", functionAutho.checkNotAuthenticated, (req, res) => {
  console.log(req.session);
  res.send('hello')
});
// router.post("/",function (req, res) {
//   console.log(req.body);
// });
router.post("/", passport.authenticate("local"), function (req, res) {
  // console.log(req.session);
  res.send({ isLogin: true });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username , password);
    let DBfindUser = await login
      .find({ username: username, password: password })
      .lean()
      .exec();
    if (DBfindUser[0]) {
      let user = {
        username: DBfindUser[0].username,
        password: DBfindUser[0].password,
      };
      if (user && user.password == password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  })
);
passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
  console.log("deserializeUser");
  let DBfindUser = await login.find({ username: username }).lean().exec();
  if (DBfindUser[0]) {
    let users = {
      username: DBfindUser[0].username,
      password: DBfindUser[0].password,
    };
    if (users) {
      return done(null, users);
    } else {
      return done(null, false);
    }
  }
});

module.exports = router;
