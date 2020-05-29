import Mongoose from 'mongoose';
import { Theme } from '../entities/theme';

// 接口同时拥有Theme和mongoose的属性，便于类型检查
export interface ThemeInterface extends Theme, Mongoose.Document {}

const themeSchema = new Mongoose.Schema<ThemeInterface>(
  {
    project: String,
    sharePerson: String,
    description: String,
    monitor: String,
    helper: String,
    bp: String,
    visitor: Number,
    timing: Number,
    link: String,
    themeLink: String,
    pictureLink: String,
    recommendToTags: [String],
  },
  {
    versionKey: false,
  }
);

// 导出的是一个theme
export default Mongoose.model<ThemeInterface>('ThemeModel', themeSchema);
