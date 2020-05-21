import { BaseEntity } from './baseEntity';
import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';
import { Type, plainToClass } from 'class-transformer';

export class UserCondition extends BaseEntity {
  @IsNotEmpty({ message: '用户邮箱不可以为空' })
  @Type(() => String)
  public idNumber: string;

  // 将一个平面对象转换成SearchCondition对象;
  public static transform(plainObject: object): UserCondition {
    if (plainObject instanceof UserCondition) {
      return plainObject;
    }
    return plainToClass(UserCondition, plainObject);
  }
}
