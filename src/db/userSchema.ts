import Mongoose from 'mongoose';
import { User } from '../entities/user';

// 接口同时拥有Theme和mongoose的属性，便于类型检查
export interface UserInterface extends User, Mongoose.Document {}

const userSchema = new Mongoose.Schema<UserInterface>(
  {
    // 用户姓名
    username: String,
    // 用户密码
    password: Number,
    // 用户标签
    tags: [String],
    // 是否是管理员
    isManger: Boolean,
  },
  {
    versionKey: false,
  }
);

// 导出的是一个theme
export default Mongoose.model<UserInterface>('userModel', userSchema);
