import { BaseEntity } from './baseEntity';
import { IsInt, Min } from 'class-validator';
import 'reflect-metadata';
import { Type, plainToClass } from 'class-transformer';

export class SearchCondition extends BaseEntity {
  @Type(() => String)
  public key: string = '';

  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码最小是1' })
  @Type(() => Number)
  public page: number = 1;

  @IsInt({ message: '页容量必须是整数' })
  @Min(1, { message: '页容量最小是1' })
  @Type(() => Number)
  public limit: number = 10;

  @Type(() => String)
  public department: string = '';

  @Type(() => String)
  public sharePerson: string = '';

  @Type(() => String)
  public type: string = '';

  @Type(() => String)
  public specialContent: string = '';

  @Type(() => String)
  public difficulty: string = '';

  // 将一个平面对象转换成SearchCondition对象;
  public static transform(plainObject: object): SearchCondition {
    if (plainObject instanceof SearchCondition) {
      return plainObject;
    }
    return plainToClass(SearchCondition, plainObject);
  }
}
