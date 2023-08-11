const sharp = require("sharp");
const Project = require("../model/projectModel");
const multer = require("multer");

exports.getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      status: "seccess",
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Error",
    });
  }
};

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

exports.uploadProjectPhoto = upload.single("photo");

exports.resizeProjectPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `project-${req.body.title}-${Date.now()}.png`;

  req.body.image = req.file.filename;

  await sharp(req.file.buffer)
    .resize(500, 500) // 500px 500px
    .toFormat("png") // формат
    .png({ quality: 90 }) //качество фото - 90 %
    .toFile(`img/projects/${req.file.filename}`); // куда отправляеем

  next();
};

exports.check = (req, res, next) => {
  if (req.body.secret !== process.env.SECRET_WORD) {
    return res.status(400).json({
      status: "Failed",
      message: "The secret word is wrong",
    });
  }

  next();
};

exports.createProject = async (req, res) => {
  try {
    await Project.create(req.body);

    res.status(200).json({
      status: "seccuss",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Error created",
    });
  }
};
