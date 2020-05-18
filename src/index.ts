import 'reflect-metadata';
import Express from 'express';
import { appendFile } from 'fs';
import ThemeRouter from './routes/themeRoute';
import UpLoadRouter from './routes/upLoadRoute';
import history from 'connect-history-api-fallback';
import { ThemeService } from './services/themeServices';
import { ThemeModel } from './db';

const app = Express();
app.use(history());
app.use('/', Express.static('dist/public/build'));
app.use('/upload', Express.static('public/upload'));

// 配置中间件，用于解析请求消息体中的json格式
app.use(Express.json());

// 使用postman进行测试
app.use('/api/theme', ThemeRouter);

// 文件上传，文件比较大，所以需要用post请求
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件
app.use('/api/upload', UpLoadRouter);

app.listen(80);

// ThemeModel.find({ limit: 10 }).then((data) => console.log(data.map((item => console.log(item.visitor)))));
ThemeModel.find().sort({ number: -1 });
// .then((data) => console.log(data.map((item) => console.log(item))));

// const arr = ['技术', '产品', '商务', '市场', '内部'];
const obj: any = {
  department: '',
  difficulty: '',
  key: '',
  limit: 5,
  page: 1,
  sharePerson: '',
  specialContent: '',
  type: '',
  // sort: 'visitor',
};

ThemeService.find(obj).then((data) => {
  // console.log(data.data);
  data.data.map((item, id) => {
    console.log(item.timing);
    // ThemeService.delete(item._id);
  });
});

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
  for (let i = 0; i < 100; i++) {
    let obj: any = {
      id: getRandom(i * 10000),
      department: department[getRandom(i % 7)],
      project: project[getRandom(i % 12)],
      time: '2020.05.10',
      sharePerson: name[getRandom(i % 7)],
      description: type[getRandom(i % 5)] + '分享',
      number: getRandom(i * 100),
      learnWay: '线上',
      adviceDepartment: [type[getRandom(i % 7)]],
      monitor: name[getRandom(i % 7)],
      helper: name[getRandom(i % 7)],
      bp: name[getRandom(i % 7)],
      type: type[getRandom(i % 5)],
      specialContent: isTrue() ? 'true' : 'false',
      difficulty: difficulty[getRandom(i % 3)],
    };
    // console.log(ThemeService.add(obj));
    ThemeService.add(obj).then((data) => console.log(data));
  }
}

// b();
