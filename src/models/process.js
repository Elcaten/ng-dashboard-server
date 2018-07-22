const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProcessSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: Boolean
  },
  hasError: {
    type: Boolean
  },
  lastStartDate: {
    type: Date
  },
  lastErrorDate: {
    type: Date
  },
  lastErrorText: {
    type: String
  }
});

module.exports = mongoose.model("Processes", ProcessSchema);
