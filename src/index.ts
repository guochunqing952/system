import 'reflect-metadata';
import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { appendFile } from 'fs';
import ThemeRouter from './routes/themeRoute';
import UserRouter from './routes/userRoute';
import UpLoadRouter from './routes/upLoadRoute';
import history from 'connect-history-api-fallback';
import { ThemeService } from './services/themeServices';
import { UserService } from './services/userServices';
import { User } from './entities/user';

const app = Express();
app.use(history());
app.use('/', Express.static('public/build'));
app.use('/upload', Express.static('public/upload'));

// 配置中间件，用于解析请求消息体中的json格式
app.use(Express.json());
app.all('*', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '152.136.230.239:80');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With,Set-Cookie:'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('X-Powered-By', ' 3.2.1');
  next();
});

// 使用postman进行测试
app.use('/api/theme', ThemeRouter);

app.use(cookieParser());
// app.use(bodyParser());

app.use('/api/login', UserRouter);

// 文件上传，文件比较大，所以需要用post请求
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件
app.use('/api/upload', UpLoadRouter);

app.listen(80);

let department = [
  '研发部',
  '人力资源部',
  '产品部',
  '质量部',
  '售前部',
  '销售部',
  '财务部',
];

const project = [
  '硬件产品供应链流程',
  'OA售前立项，售前转售中流程培训',
  '团队个人分享-建行项目',
  'HyperCycle面面观',
  'Python知识分享',
  '30分钟教你快速选购理财产品',
  '零售数字化投资策略',
  'HyperCycle 项目工作量评估模板的使用说明',
  '新一代的机器学习技术知识普及和应用场景（强化学习、自动机器学习、隐私学习）',
  'Jmeter基础及对在线预估接口性能测试',
  '云原生相关知识，包括云原生的架构优势、最佳实践等',
  '在范式的自动机器学习组件研发历程',
];

const name = ['杜小狗', '王小鸡', '刘小虫', '邓小鸭', '张三', '李四', '王五'];
const type = ['技术', '产品', '商务', '市场', '内部'];
const difficulty = ['初级', '中级', '进阶'];

function getRandom(a) {
  const max = a;
  let t = Math.floor(Math.random() * (max + 1));
  return t;
}

function isTrue() {
  return Math.random() > 0.95;
}

function b() {
  for (let i = 0; i < 3; i++) {
    let obj: any = {
      project: project[getRandom(i % 12)],
      sharePerson: name[getRandom(i % 7)],
      description: type[getRandom(i % 5)] + '分享',
      monitor: name[getRandom(i % 7)],
      helper: name[getRandom(i % 7)],
      bp: name[getRandom(i % 7)],
      recommendToTags: [
        department[getRandom(i % 7)],
        type[getRandom(i % 5)],
        difficulty[getRandom(i % 3)],
        'true',
      ],
      visitor: 0,
    };
    ThemeService.add(obj).then((data) => console.log(data));
  }
}
// b();
const user: any = {
  username: 'yibo',
  password: 12345678,
  tags: ['销售', '销售', '特色课程', '中级'],
};
// UserService.add(user).then((data) => console.log(data));
