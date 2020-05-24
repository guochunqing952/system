import { User } from '../entities/user';
import { UserInterface } from '../db/userSchema';
import { UserModel } from '../db';
import { UserCondition, OneUserCondition } from '../entities/userCondition';
import { SearchResult } from '../entities/commonTypes';

// 用户的增删改查功能
export class UserService {
  // 增加一个用户
  public static async add(user: User): Promise<UserInterface | string[]> {
    // 1、转换类型
    user = User.transform(user);

    // 2、数据验证(异步的)
    const errors = await user.validateThis();
    // 有错误的时候返回如下
    if (errors.length > 0) {
      return errors;
    }
    // 3、添加用户到数据库(异步)
    // 返回的正常的用户
    const result = await UserModel.create(user);
    return result;
  }

  // 修改单个用户信息
  public static async edit(
    username: string,
    tags: string[]
  ): Promise<string[]> {
    // 3、修改用户信息到数据库(异步)
    // 返回的空数组
    const user = await UserModel.findOne({ username });
    if (user && user.tags) {
      const newTags = [...user.tags, ...tags];
      const newUser = { ...user, tags: newTags };
      console.log(newTags, newUser);
      return await UserModel.updateOne(user._id, newUser);
    }
    return [];
  }

  // 删除一个用户
  public static async delete(id: string): Promise<boolean> {
    await UserModel.deleteOne({ _id: id });
    return true;
  }
  // 查找一个用户
  public static async findOne(
    condition: OneUserCondition
  ): Promise<UserInterface | null> {
    return await UserModel.findOne(condition);
  }

  // 查找单个或者多个用户信息
  public static async find(
    condition: UserCondition
  ): Promise<SearchResult<UserInterface>> {
    // 1、条件转换类型
    const newCondition = UserCondition.transform(condition);

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

    // 3、进行查询
    // 先关键字查询，找到对应的用户
    const user = await UserModel.find({
      // idEmail: { $regex: new RegExp(newCondition.idNumber) },
      username: { $regex: new RegExp(newCondition.username) },
      password: newCondition.password,
    });
    const count = await UserModel.find({
      username: { $regex: new RegExp(newCondition.username) },
      password: newCondition.password,
    }).countDocuments();

    return {
      count,
      data: user,
      errors: [],
    };
  }
}
