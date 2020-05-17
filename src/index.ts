import 'reflect-metadata';
import Express from 'express';
import { appendFile } from 'fs';
import ThemeRouter from './routes/themeRoute';
import UpLoadRouter from './routes/upLoadRoute';
import history from 'connect-history-api-fallback';
import { ThemeService } from './services/themeServices';

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
// const arr = ['技术', '产品', '商务', '市场', '内部'];
const obj: any = {
  department: '',
  difficulty: '',
  key: '',
  limit: 12,
  page: 1,
  sharePerson: '',
  specialContent: '',
  type: '',
};
ThemeService.find(obj).then((data) => {
  // console.log(data.data);
  // data.data.map((item, id) => {
  //   ThemeService.delete(item._id);
  // });
});
// const obj1: any = {};
// ThemeService.find(obj1).then((data) => {
//   console.log(data);
//   data.data.map((item) => {
//     console.log(item.type);
//   });
// });

let department = [
  '研发部',
  '人力资源部',
  '产品部',
  '质量部',
  '售前部',
  '销售部',
  '财务部',
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

// console.log(isTrue());

function b() {
  for (let i = 0; i < 500; i++) {
    let obj: any = {
      id: getRandom(i * 10000),
      department: department[getRandom(i % 7)],
      project: type[getRandom(i % 7)] + '主题' + i,
      time: '2020.05.10',
      sharePerson: name[getRandom(i % 7)],
      description: type[getRandom(i % 7)] + '分享',
      number: getRandom(i * 100),
      learnWay: '线上',
      adviceDepartment: [type[getRandom(i % 7)]],
      monitor: name[getRandom(i % 7)],
      helper: name[getRandom(i % 7)],
      bp: name[getRandom(i % 7)],
      type: type[getRandom(i % 7)],
      specialContent: isTrue() ? 'true' : 'false',
      difficulty: difficulty[getRandom(i % 3)],
    };
    console.log(ThemeService.add(obj));
    ThemeService.add(obj).then((data) => console.log(data));
  }
}

// b();

// const obj1: any = {
//   department: '研发',
//   project: '特色主题',
//   sharePerson: '大宝',
//   description: '就哈是吧大巴开阿快点把可比性',
//   monitor: '大宝',
//   specialContent: false,
//   difficulty: '初级',
//   type: '技术',
// };
// ThemeService.add(obj1).then((data) => console.log(data));
