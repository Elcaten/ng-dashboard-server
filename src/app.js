const express = require("express");
const bodyParser = require("body-parser");
const hostController = require("./controllers/hostController");

require("./config/db");

const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app
  .route("/hosts")
  .get(hostController.listAllHosts)
  .post(hostController.createNewHost);

app
  .route("/hosts/:hostid")
  .put(hostController.updateHost);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
