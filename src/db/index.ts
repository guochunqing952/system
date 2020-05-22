import Mongoose from 'mongoose';
import ThemeModel from './themeSchema';
import UserModel from './userSchema';

// Mongoose.connect('mongodb://152.136.230.239:27017/themedb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('主题数据库连接成功'));

Mongoose.connect('mongodb://152.136.230.239:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('用户数据库连接成功'));

export { ThemeModel, UserModel };
