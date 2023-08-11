const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A name must have"],
  },
  icon: {
    type: String,
    require: [true, "A icon must have"],
  },
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
