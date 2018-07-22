const mongoose = require("mongoose");

const dbURI =
  "mongodb://dbuser:JXjfOXNAFDj8mXSy@ng-dash-cluster-shard-00-00-a0jck.gcp.mongodb.net:27017,ng-dash-cluster-shard-00-01-a0jck.gcp.mongodb.net:27017,ng-dash-cluster-shard-00-02-a0jck.gcp.mongodb.net:27017/test?ssl=true&replicaSet=NG-DASH-CLUSTER-shard-0&authSource=admin&retryWrites=true";

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

require("../models/host");
require("../models/process");
require("../models/service");
