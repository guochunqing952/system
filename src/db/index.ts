import Mongoose from 'mongoose';
import ThemeModel from './themeSchema';

Mongoose.connect('mongodb://152.136.230.239:27017/themedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('连接成功'));

export { ThemeModel };
