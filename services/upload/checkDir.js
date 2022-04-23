const fs = require("fs");
const path = require("path");

const dir = {
  urlThumb: "public/uploads",
}
const checkDir = () => {
  const dirThumb= path.join(__dirname, `../../${dir.urlThumb}`)
  if (!fs.existsSync(dirThumb)) {
    fs.mkdirSync(dirThumb, { recursive: true });
  }
  return;
};

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb('Error: Image Only!')
  }
}

module.exports = {
  checkDir,
  checkFileType,
};