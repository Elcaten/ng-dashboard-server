const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: {
    type: String
  },
  tags: {
    type: [String]
  },
  status: {
    type: String
  },
  releaseVersion: {
    type: String
  }
});

module.exports = mongoose.model("Services", ServiceSchema);
