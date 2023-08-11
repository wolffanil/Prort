const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A title must be"],
  },
  description: {
    type: String,
    required: [true, "A desc must be"],
  },
  linkToGit: {
    type: String,
    required: [true, "A link to github must be"],
  },
  linkToNet: {
    type: String,
    required: [true, "A link to network must be"],
  },
  image: {
    type: String,
    required: [true, "A img must be"],
  },
  tags: {
    type: [tagSchema],
    required: [true, "A tags must have"],
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
