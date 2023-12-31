const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const projectRouter = require("./routers/projectRoute");
const cors = require("cors");
const skillRouter = require("./routers/skillRoute");

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
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/images", express.static(path.join(__dirname, "img")));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requestes on this IP",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/skills", skillRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server working");
});
