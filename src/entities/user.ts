import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Type, plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { BaseEntity } from './baseEntity';

export class User extends BaseEntity {
  @IsNotEmpty({ message: '用户姓名不可以为空' })
  @Type(() => String)
  public username: string;

  @IsNotEmpty({ message: '用户密码不可以为空' })
  @Type(() => Number)
  public password: number;

  @IsNotEmpty({ message: '用户标签不可以为空' })
  @ArrayMinSize(1, { message: '标签数量>=1' })
  @IsArray({ message: '用户标签必须是数组' })
  public tags?: any[];

  public static transform(plainObj: object): User {
    if (plainObj instanceof User) {
      return plainObj;
    }
    const userObj = plainToClass(User, plainObj);
    return userObj;
  }
}
