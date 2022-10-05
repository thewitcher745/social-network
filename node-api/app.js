const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const { postValidator } = require("./middleware/postValidator");
const {
  signInValidator,
  signUpValidator,
} = require("./middleware/authvalidator");
const rootValidator = require("./middleware/rootValidator");

const app = express();
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
// The root validator MUST be called as the very last one, so it will contain all the potential errors
app.get("/", rootValidator, postRoutes);
app.post("/post", postValidator(), rootValidator, postRoutes);
app.post("/removePost", rootValidator, postRoutes);

app.post("/signup", signUpValidator(), rootValidator, authRoutes);
app.post("/signin", signInValidator(), rootValidator, authRoutes);
app.post("/signout", rootValidator, authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A NodeJS API is listening on port ${port}`);
});
