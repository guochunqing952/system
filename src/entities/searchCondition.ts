import { BaseEntity } from './baseEntity';
import { IsInt, Min, IsNotEmpty, ArrayMinSize, IsArray } from 'class-validator';
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

  @IsNotEmpty({ message: '课程标签不可以为空' })
  @IsArray({ message: '课程标签必须是数组' })
  public tags: any[] = [
    '研发',
    '产品',
    '商务',
    '市场',
    '技术',
    '内部',
    true,
    false,
    '初级',
    '中级',
    '高级',
    '内部',
    '研发部',
    '产品部',
    '人力资源部',
    '质量部',
    '售前部',
    '销售部',
    '财务部',
  ];

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

  @Type(() => String)
  public sort: string = 'timing';

  // 将一个平面对象转换成SearchCondition对象;
  public static transform(plainObject: object): SearchCondition {
    if (plainObject instanceof SearchCondition) {
      return plainObject;
    }
    return plainToClass(SearchCondition, plainObject);
  }
}
