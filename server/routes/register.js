var express = require("express");
var router = express.Router();
const functionAutho = require("../public/javascripts/CheckAutho");
const login = require("../public/db/User_Schema");
/* GET home page. */
router.get("/", functionAutho.checkNotAuthenticated, (req, res) => {
  console.log('register');
});

router.post("/", (req, res) => {
  let User = new login(req.body);
  User.save(function (err, result) {
    if (err) {
        res.send({ redirect: "/register"})
    } else {
      console.log(result);
    }
  });
  res.send({ redirect: "/login"})
});
module.exports = router;
