const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HostSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String
  },
  ram: {
    type: Number
  },
  cpu: {
    type: Number
  },
  disk: {
    type: Number
  }
});

module.exports = mongoose.model("Hosts", HostSchema);
