import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Type, plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { BaseEntity } from './baseEntity';

export class LoginUser extends BaseEntity {
  @IsNotEmpty({ message: '用户姓名不可以为空' })
  @Type(() => String)
  public username: string;

  @IsNotEmpty({ message: '用户密码不可以为空' })
  @Type(() => Number)
  public password: number;

  public static transform(plainObj: object): LoginUser {
    if (plainObj instanceof LoginUser) {
      return plainObj;
    }
    const userObj = plainToClass(LoginUser, plainObj);
    return userObj;
  }
}
