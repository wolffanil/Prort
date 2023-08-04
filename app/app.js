const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const projectRouter = require("./routers/projectRoute");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connect"))
  .catch((err) => console.log("Error conncect to DB" + err));

const app = express();
app.use(cors());

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "img")));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requestes on this IP",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use((req, res, next) => {
  console.log("Hello");

  next();
});

app.use("/api/v1/projects", projectRouter);
// app.use("api/v1/skills");

app.listen(3000, () => {
  console.log("server working");
});
