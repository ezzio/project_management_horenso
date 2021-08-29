
const mongoose = require('mongoose');

let mongose = mongoose.connect("mongodb://localhost:27017/Horenso_Manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongose;