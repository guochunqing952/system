import Express from 'express';
import session from 'express-session';
import { UserService } from '../services/userServices';
import { ResponseHelper } from './responseHelper';

const router = Express.Router();
// 登陆接口
// 返回的参数 {msg:'xxx',err:1,user:{username,password}}
router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  const obj: any = { username, password };
  const data = await UserService.find(obj);

  if (data.count > 0) {
    const result = { ...data.data, code: 1 };
    ResponseHelper.sendData(result, res);
  } else {
    const result = '用户名/密码错误';
    ResponseHelper.sendError(result, res);
  }
});

export default router;
