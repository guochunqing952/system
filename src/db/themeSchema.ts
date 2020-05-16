import Mongoose from 'mongoose';
import { Theme } from '../entities/theme';

// 接口同时拥有Theme和mongoose的属性，便于类型检查
export interface ThemeInterface extends Theme, Mongoose.Document {}

const themeSchema = new Mongoose.Schema<ThemeInterface>(
  {
    department: String,
    project: String,
    time: String,
    sharePerson: String,
    description: String,
    number: Number,
    learnWay: String,
    fileType: String,
    adviceDepartment: [String],
    monitor: String,
    helper: String,
    bp: String,
    type: [String],
    visitor: Number,
    timing: Number,
    link: String,
  },
  {
    versionKey: false,
  }
);

// 导出的是一个theme
export default Mongoose.model<ThemeInterface>('ThemeModel', themeSchema);
