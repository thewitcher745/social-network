const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const masterRouter = require("./routes/masterRouter");

var app = express();
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected."));

mongoose.connection.on("error", (err) => console.error(err));

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app = masterRouter(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A NodeJS API is listening on port ${port}`);
});
