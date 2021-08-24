var express = require('express');
var router = express.Router();
const functionAutho = require('../public/javascripts/CheckAutho')

/* GET home page. */
router.get('/', functionAutho.checkAuthentica, (req, res) => {
  // res.render('index', { title: 'Express' });
  res.send('hello');
});

module.exports = router;
