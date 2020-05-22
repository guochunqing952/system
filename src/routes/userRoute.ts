import Express from 'express';
import session from 'express-session';
import { UserService } from '../services/userServices';

const router = Express.Router();
// 登陆接口
// 返回的参数 {msg:'xxx',err:1,user:{username,password}}
router.post('/', async (req, res, next) => {
  // const { username, password } = req.body;
  // const obj: any = { username, password };
  // const data = await UserService.find(obj);
  // console.log(data);
  console.log(req.body);
  res.send('hello');
});

export default router;
