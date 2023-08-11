const express = require("express");
const {
  getAllSkills,
  createSkill,
  uploadSkillPhoto,
  resizeSkillPhoto,
} = require("../controllers/skillContoller");

const router = express.Router();

router.route("/").get(getAllSkills);

// router.use(upload.none(), check);

router.route("/").post(uploadSkillPhoto, resizeSkillPhoto, createSkill);

module.exports = router;
