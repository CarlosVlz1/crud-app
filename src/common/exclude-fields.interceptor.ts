import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class ExcludeFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return data.map(this.excludeFields)
        }
        return this.excludeFields(data)
      }),
    )
  }

  excludeFields(obj: any) {
    if (!obj) return obj
    const plainObject = obj.toObject ? obj.toObject() : obj
    const { _id, __v, createdAt, updatedAt, ...rest } = plainObject
    if (rest.toObject) {
      delete rest.toObject
    }
    return rest
  }
}
