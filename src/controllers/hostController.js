const Host = require("../models/host");

exports.listAllHosts = (req, res) => {
  Host.find({}, (err, host) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(host);
  });
};

exports.createNewHost = (req, res) => {
  let newHost = new Host(req.body);
  newHost.save((err, host) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(host);
  });
};

exports.updateHost = (req, res) => {
  Host.findOneAndUpdate(
    { _id: req.params.hostid },
    req.body,
    { new: true },
    (err, host) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(host);
    }
  );
};
