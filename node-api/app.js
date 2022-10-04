const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const postRoutes = require("./routes/post");

const app = express();
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected."));

mongoose.connection.on("error", (err) => console.error(err));

// Middleware
app.use(morgan("dev"));

app.get("/", postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A NodeJS API is listening on port ${port}`);
});
