import 'reflect-metadata';
import Express from 'express';
import { appendFile } from 'fs';
import ThemeRouter from './routes/themeRoute';
import UpLoadRouter from './routes/upLoadRoute';
import history from 'connect-history-api-fallback';
import { ThemeService } from './services/themeServices';
import { ThemeModel, UserModel } from './db';
import { UserService } from './services/userServices';
import { User } from './entities/user';

const app = Express();
app.use(history());
app.use('/', Express.static('public/build'));
app.use('/upload', Express.static('public/upload'));

// 配置中间件，用于解析请求消息体中的json格式
app.use(Express.json());

// 使用postman进行测试
app.use('/api/theme', ThemeRouter);

// 文件上传，文件比较大，所以需要用post请求
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件
app.use('/api/upload', UpLoadRouter);

app.listen(80);

const obj: any = {
  limit: 100,
};
ThemeService.find(obj).then((data) => {
  console.log(data.count);
  data.data.map((item) => {
    //  onsole.log(item); c
    ThemeService.delete(item._id);
    ThemeModel.deleteOne({ _id: item._id });
  });
});
