import Mongoose from 'mongoose';
import { User } from '../entities/user';

// 接口同时拥有Theme和mongoose的属性，便于类型检查
export interface UserInterface extends User, Mongoose.Document {}

const userSchema = new Mongoose.Schema<UserInterface>(
  {
    // 用户邮箱
    idEmail: String,
    // 用户姓名
    name: String,
    // 用户标签
    tags: [String],
  },
  {
    versionKey: false,
  }
);

// 导出的是一个theme
export default Mongoose.model<UserInterface>('userModel', userSchema);
