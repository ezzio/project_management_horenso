const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
  
    name : { type: String},
    createAt : { type: String},
    is_complete : { type: Boolean},
    process: { type: String},
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owners: { type: Schema.Types.ObjectId, ref: 'User' },
  },

);

// const DonHang = ;
module.exports = mongoose.model("Project", ProjectSchema);
