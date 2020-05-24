import Mongoose from 'mongoose';
import { LoginUser } from '../entities/loginUser';

// 接口同时拥有Theme和mongoose的属性，便于类型检查
export interface LoginUserInterface extends LoginUser, Mongoose.Document {}

const loginUserSchema = new Mongoose.Schema<LoginUserInterface>(
  {
    // 用户姓名
    username: String,
    // 用户密码
    password: Number,
  },
  {
    versionKey: false,
  }
);

// 导出的是一个theme
export default Mongoose.model<LoginUserInterface>(
  'loginUserModel',
  loginUserSchema
);
