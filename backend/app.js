const express = require("express");
const routerRest = require("./routes/rest");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = ["http://localhost:5000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.include(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use("/", routerRest);
app.use(bodyParser.json());

app.listen(9999, () => {
  console.log("server started on localhost:9999");
});
