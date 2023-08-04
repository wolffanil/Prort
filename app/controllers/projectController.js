const sharp = require("sharp");
const Project = require("../model/projectModel");
const multer = require("multer");

exports.getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      status: "seccuss",
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

  req.file.filename = `project-${req.body.title}-${Date.now()}.jpeg`;

  req.body.img = req.file.filename;

  await sharp(req.file.buffer)
    .resize(500, 500) // 500px 500px
    .toFormat("jpeg") // формат
    .jpeg({ quality: 90 }) //качество фото - 90 %
    .toFile(`img/${req.file.filename}`); // куда отправляеем

  next();
};

exports.createProject = async (req, res) => {
  try {
    if (req.body.secret !== process.env.SECRET_WORD)
      throw new Error("You dont use it");

    await Project.create(req.body);

    res.status(200).json({
      status: "seccuss",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "Error",
    });
  }
};
