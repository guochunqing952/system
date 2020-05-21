import Express from 'express';
import { ThemeService } from '../services/themeServices';
import { ResponseHelper } from './responseHelper';

const router = Express.Router();

router.get('/:id', async (req, res) => {
  try {
    const themeId = req.params.id;
    const theme = await ThemeService.findById(themeId);
    // 响应：服务器的响应格式，往往是一种标准格式
    ResponseHelper.sendData(theme, res);
  } catch {
    ResponseHelper.sendData(null, res);
  }
});

router.get('/', async (req, res) => {
  const conditon: any = req.query;
  const result = await ThemeService.find(conditon);
  ResponseHelper.sendPageData(result, res);
});

router.post('/', async (req, res) => {
  const result = await ThemeService.add(req.body);
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, res);
  } else {
    ResponseHelper.sendData(result, res);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await ThemeService.edit(req.params.id, req.body);
    if (result.length > 0) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.sendData(true, res);
    }
  } catch {
    ResponseHelper.sendError('id错误', res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await ThemeService.delete(req.params.id);
    ResponseHelper.sendData(true, res);
  } catch {
    ResponseHelper.sendError('id错误', res);
  }
});

export default router;
