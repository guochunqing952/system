import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { Type, plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { BaseEntity } from './baseEntity';

export class Theme extends BaseEntity {
  @IsNotEmpty({ message: '部门不可以为空' })
  @Type(() => String)
  public department: string;

  @IsNotEmpty({ message: '类型不可以为空' })
  @ArrayMinSize(1, { message: '类型>=1' })
  @IsArray({ message: '类型必须是数组' })
  @Type(() => String)
  public type: string[];

  @IsNotEmpty({ message: '学习主题不可以为空' })
  @Type(() => String)
  public project: string;

  // @IsNotEmpty({ message: '学习时间不可以为空' })
  // @Type(() => String)
  public time: string;

  @IsNotEmpty({ message: '分享人不可以为空' })
  @Type(() => String)
  public sharePerson: string;

  @IsNotEmpty({ message: '分享人描述不可以为空' })
  @Type(() => String)
  public description: string;

  @IsNotEmpty({ message: '班长不可以为空' })
  @Type(() => String)
  public monitor: string;

  // @IsNotEmpty({ message: '预计参加人数不可以为空' })
  // @Type(() => String)
  public number: number = 1;

  // @IsNotEmpty({ message: '学习方式不可以为空' })
  // @Type(() => String)
  public learnWay: string = '';

  // @IsNotEmpty({ message: '文件类型不可以为空' })
  // @Type(() => String)
  public fileType: string;

  public timing: number = new Date().getTime();

  // @IsNotEmpty({ message: '建议其他学习的部门不可以为空' })
  // @ArrayMinSize(1, { message: '建议学习的部门>=1' })
  // @IsArray({ message: '建议其他学习的部门必须是数组' })
  // @Type(() => String)
  public adviceDepartment: string[] = [];

  // @IsNotEmpty({ message: '学习委员不可以为空' })
  // @Type(() => String)
  public helper: string = '';

  // @IsNotEmpty({ message: 'BP不可以为空' })
  // @Type(() => String)
  public bp: string = '';

  // @IsNotEmpty({ message: '访问量不可以为空' })
  // @Type(() => Number)
  public visitor: number = 0;

  public link: string =
    'https://empower.4paradigm.com/#/course-center/fe8bb9a5-1cd2-4374-afce-2fc94839ebc0';

  public static transform(plainObj: object): Theme {
    if (plainObj instanceof Theme) {
      return plainObj;
    }
    const themeObj = plainToClass(Theme, plainObj);
    return themeObj;
  }
}
