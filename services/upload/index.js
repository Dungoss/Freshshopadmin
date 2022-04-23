const multer = require("multer");
const path = require("path");
const { checkFileType } = require("./checkDir")
const { sendError } = require("../../utils/index")
const storageThumb = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, "thumbnail" + '-' + Date.now() + path.extname(file.originalname))
  }
})

const uploadThumb = multer({
  storage: storageThumb,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('file')



const createThumb = (req, res) => {
  return uploadThumb(req, res, async (err) => {
    if (err) return res.status(500).json(sendError(err));
    if (req.file === undefined) return res.status(400).json(sendError("File lựa chọn không đúng"));
    return res.json({
      error: false,
      name: req.file.filename,
      message: "File uploaded!",
      status: "done",
      url: `${process.env.NODE_ENV !== "production"
          ? process.env.HOST_DOMAIN_DEV
          : process.env.HOST_DOMAIN
        }/public/uploads/${req.file.filename}`,
    });
  });

}
module.exports = {
  createThumb
};