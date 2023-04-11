import multer from 'multer';

const mimeType = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};
const storage = multer.diskStorage({
  destination(req, file: Express.Multer.File, callback) {
    callback(null, 'image');
  },
  filename(req, file: Express.Multer.File, callback: any) {
    const name = file.originalname.split('').join('_');
    const extension = mimeType[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});
module.exports = multer({ storage }).single('image');
