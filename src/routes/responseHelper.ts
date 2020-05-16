import { Response } from 'express';
import { SearchResult } from '../entities/commonTypes';

// 统一响应格式
export class ResponseHelper {
  // 响应有错误的情况
  public static sendError(error: string | string[], res: Response) {
    let err: string;
    if (Array.isArray(error)) {
      err = error.join(';');
    } else {
      err = error;
    }
    // 完成响应
    res.send({
      err,
      data: null,
    });
  }

  // 响应正常的数据
  public static sendData(data: any, res: Response) {
    // 完成响应
    res.send({
      err: '',
      data,
    });
  }

  // 响应分页数据
  public static sendPageData<T>(result: SearchResult<T>, res: Response) {
    if (result.errors.length > 0) {
      // 有错误
      this.sendError(result.errors, res);
    } else {
      res.send({
        err: '',
        data: result.data,
        total: result.count,
      });
    }
  }
}
