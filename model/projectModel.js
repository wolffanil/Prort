const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
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
  img: {
    type: String,
    required: [true, "A img must be"],
  },
  tools: {
    type: String,
    required: [true, "A tools must be"],
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
