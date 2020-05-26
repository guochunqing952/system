import Express from 'express';
import multer from 'multer';
import { pathToFileURL } from 'url';
import path from 'path';
import { ResponseHelper } from './responseHelper';
const router = Express.Router();

// 通过multer库设置上传的文件名和位置
const storage = multer.diskStorage({
  // 设置上传的文件名
  destination: path.resolve(__dirname, '../../public/upload/'),
  filename(req, file, cb) {
    // 文件名
    const time = new Date().getTime();
    // 后缀名
    const extname = path.extname(file.originalname);
    // 设置文件全称
    cb(null, `${time}${extname}`);
  },
});

const allowedExtensions = ['.jpg', '.png', '.gif', 'bmp', '.jiff'];
const upload = multer({
  storage, // 图片存储位置
  limits: {
    fileSize: 1024 * 1024 * 1024 * 5, // 文件最多5G
  }, // 图片存储大小
  fileFilter(req, file, cb) {
    // 限制后缀名
    const extname = path.extname(file.originalname);
    if (allowedExtensions.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error('文件后缀不正确'));
    }
  },
}).single('imgfile');

router.post('/', (req, res) => {
  // 文件上传的结果
  upload(req, res, (err) => {
    if (err) {
      ResponseHelper.sendError(err.message, res);
    } else {
      const url = `/upload/${req.file.filename}`;
      ResponseHelper.sendData(url, res);
    }
  });
});

export default router;
