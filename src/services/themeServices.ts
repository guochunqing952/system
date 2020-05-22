import { Theme } from '../entities/theme';
import { ThemeInterface } from '../db/themeSchema';
import { ThemeModel, UserModel } from '../db';
import { SearchCondition } from '../entities/searchCondition';
import { SearchResult } from '../entities/commonTypes';
import { UserService } from './userServices';

// 主题的增删改查功能
export class ThemeService {
  // 增加一条电影功能
  public static async add(theme: Theme): Promise<ThemeInterface | string[]> {
    // 1、转换类型
    theme = Theme.transform(theme);
    // 2、数据验证(异步的)
    const errors = await theme.validateThis();
    // 有错误的时候返回如下
    if (errors.length > 0) {
      return errors;
    }
    // 3、添加到数据库(异步)
    // 返回的正常的电影
    const result = await ThemeModel.create(theme);
    return result;
  }

  // 修改一条电影
  public static async edit(id: string, theme: Theme): Promise<string[]> {
    // 1、转换类型
    theme = Theme.transform(theme);

    // 2、数据验证(异步的)
    const errors = await theme.validateThis(true);
    // 有错误的时候返回如下
    if (errors.length > 0) {
      return errors;
    }
    // 3、修改主题信息到数据库(异步)
    // 返回的正常的主题
    await ThemeModel.updateOne({ _id: id }, theme);
    return [];
  }

  // 删除一个主题
  public static async delete(id: string): Promise<void> {
    await ThemeModel.deleteOne({ _id: id });
  }
  // 查找一条主题
  public static async findById(id: string): Promise<ThemeInterface | null> {
    return await ThemeModel.findById(id);
  }

  // 查找多条电影数据
  public static async find(
    condition: SearchCondition
  ): Promise<SearchResult<ThemeInterface>> {
    // 1、条件转换类型
    const newCondition = SearchCondition.transform(condition);

    // 2、条件数据验证(异步的)
    const errors = await newCondition.validateThis(true);
    // 有错误的时候返回如下
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors,
      };
    }
    // const obj: any = {
    //   // idNumber: '456',
    // };
    // const user = await UserService.find(obj);
    // console.log(user.data[0].tags);

    // 3、进行查询
    // 先关键字查询，然后分页
    const theme = await ThemeModel.find({
      // recommendToTags: {
      //   $in: [...user.data[0].tags],
      // },
      $or: [
        { project: { $regex: new RegExp(newCondition.key) } },
        { sharePerson: { $regex: new RegExp(newCondition.key) } },
      ],
      $and: [
        { recommendToTags: { $regex: new RegExp(newCondition.department) } },
        { recommendToTags: { $regex: new RegExp(newCondition.type) } },
        { recommendToTags: { $regex: new RegExp(newCondition.difficulty) } },
        {
          recommendToTags: { $regex: new RegExp(newCondition.specialContent) },
        },
      ],
    })
      .sort({ [newCondition.sort]: -1 })
      .skip((newCondition.page - 1) * newCondition.limit)
      .limit(newCondition.limit);

    const count = await ThemeModel.find({
      // recommendToTags: {
      //   $in: [...user.data[0].tags],
      // },
      $or: [
        { project: { $regex: new RegExp(newCondition.key) } },
        { sharePerson: { $regex: new RegExp(newCondition.key) } },
      ],
      $and: [
        { recommendToTags: { $regex: new RegExp(newCondition.department) } },
        { recommendToTags: { $regex: new RegExp(newCondition.type) } },
        { recommendToTags: { $regex: new RegExp(newCondition.difficulty) } },
        {
          recommendToTags: { $regex: new RegExp(newCondition.specialContent) },
        },
      ],
    }).countDocuments();

    return {
      count,
      data: theme,
      errors: [],
    };
  }
}
