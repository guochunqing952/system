import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Type, plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { BaseEntity } from './baseEntity';

export class Theme extends BaseEntity {
  @IsNotEmpty({ message: '学习主题不可以为空' })
  @Type(() => String)
  public project: string;

  @IsNotEmpty({ message: '分享人不可以为空' })
  @Type(() => String)
  public sharePerson: string;

  @IsNotEmpty({ message: '分享人描述不可以为空' })
  @Type(() => String)
  public description: string;

  @IsNotEmpty({ message: '课程创建时间不可以为空' })
  @Type(() => Number)
  public timing: number = new Date().getTime();

  @IsNotEmpty({ message: '范大链接不可以为空' })
  @Type(() => String)
  public link: string =
    'https://empower.4paradigm.com/#/course-center/fe8bb9a5-1cd2-4374-afce-2fc94839ebc0';

  @IsNotEmpty({ message: '课程标签不可以为空' })
  @ArrayMinSize(1, { message: '课程标签>=1' })
  @IsArray({ message: '课程标签必须是数组' })
  @Type(() => String)
  public recommendToTags: string[];

  @IsNotEmpty({ message: '访问量不可以为空' })
  @Type(() => Number)
  public visitor: number = 0;

  @IsNotEmpty({ message: '班长不可以为空' })
  @Type(() => String)
  public monitor: string;

  // @IsNotEmpty({ message: '学习委员不可以为空' })
  // @Type(() => String)
  public helper: string = '';

  // @IsNotEmpty({ message: 'BP不可以为空' })
  // @Type(() => String)
  public bp: string = '';

  public static transform(plainObj: object): Theme {
    if (plainObj instanceof Theme) {
      return plainObj;
    }
    const themeObj = plainToClass(Theme, plainObj);
    return themeObj;
  }
}
