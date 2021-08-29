const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    displayName: { type: String },
    avatar: { type: String},
    githubToken: { type: String},
    createAt: { type: Date, default: Date.now },
  },
  { collection: "User" }
);

// const DonHang = ;
module.exports = mongoose.model("User", User);
