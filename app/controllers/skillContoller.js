const Skill = require("../model/skillModel");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

exports.uploadSkillPhoto = upload.single("photo");

exports.resizeSkillPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `skill-${req.body.title}-${Date.now()}.png`;

  req.body.icon = req.file.filename;

  await sharp(req.file.buffer)
    .resize(500, 500) // 500px 500px
    .toFormat("png") // формат
    .png({ quality: 90 }) //качество фото - 90 %
    .toFile(`img/skills/${req.file.filename}`); // куда отправляеем

  next();
};

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    res.status(200).json({
      status: "seccess",
      data: {
        skills,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "get skills error",
    });
  }
};

exports.createSkill = async (req, res) => {
  try {
    await Skill.create(req.body);

    res.status(201).json({
      status: "seccess",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "create skill error",
    });
  }
};
