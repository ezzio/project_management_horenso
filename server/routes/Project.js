var express = require('express');
var router = express.Router();
const Project = require('../public/db/Project_Schema')
// const functionAutho = require('../public/javascripts/CheckAutho')

/* GET home page. */
router.get('/', function(req, res){
        res.send('hello')
})
router.post('/createANsewProject', async (req, res) =>{
    let name = req.body
    // res.send(name)
    let project = new Project(name)
    await project.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
         res.send({redirect: '/addmember'})
        }
      })
})
router.post('/AddMember', async (req, res) =>{
    let name = req.body
    // res.send(name)
    let project = new Project(name)
    await project.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
         res.send({redirect: '/addmember'})
        }
      })
})


module.exports = router;
