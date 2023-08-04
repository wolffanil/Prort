const express = require("express");
const {
  createProject,
  getAllProject,
  uploadProjectPhoto,
  resizeProjectPhoto,
} = require("../controllers/projectController");

const router = express.Router();

router
  .route("/")
  .get(getAllProject)
  .post(uploadProjectPhoto, resizeProjectPhoto, createProject);

module.exports = router;
