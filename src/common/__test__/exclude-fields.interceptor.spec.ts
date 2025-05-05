import { CallHandler, ExecutionContext } from '@nestjs/common'
import { of } from 'rxjs'
import { ExcludeFieldsInterceptor } from '../exclude-fields.interceptor'

describe('ExcludeFieldsInterceptor', () => {
  let interceptor: ExcludeFieldsInterceptor
  let mockExecutionContext: ExecutionContext
  let mockCallHandler: CallHandler

  beforeEach(() => {
    interceptor = new ExcludeFieldsInterceptor()
    mockExecutionContext = {} as ExecutionContext // Mock según sea necesario
  })

  it('should be defined', () => {
    expect(interceptor).toBeDefined()
  })

  it('should exclude specified fields from a single object', done => {
    const data = {
      _id: '123',
      __v: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Test',
      value: 42,
      toObject: function () {
        return this
      }, 
    }

    mockCallHandler = {
      handle: () => of(data),
    }

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      next: result => {
        expect(result).toEqual({ name: 'Test', value: 42 })
        expect(result._id).toBeUndefined()
        expect(result.__v).toBeUndefined()
        expect(result.createdAt).toBeUndefined()
        expect(result.updatedAt).toBeUndefined()
      },
      complete: () => done(),
    })
  })

  it('should exclude specified fields from an array of objects', done => {
    const dataArray = [
      {
        _id: '1',
        __v: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Test1',
        toObject: function () {
          return this
        },
      },
      {
        _id: '2',
        __v: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Test2',
        toObject: function () {
          return this
        },
      },
    ]

    mockCallHandler = {
      handle: () => of(dataArray),
    }

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      next: result => {
        expect(result).toEqual([{ name: 'Test1' }, { name: 'Test2' }])
        expect(result[0]._id).toBeUndefined()
        expect(result[1]._id).toBeUndefined()
      },
      complete: () => done(),
    })
  })

  it('should handle objects without toObject method', done => {
    const plainObject = {
      _id: '123',
      __v: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Plain Test',
    }

    mockCallHandler = {
      handle: () => of(plainObject),
    }

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      next: result => {
        expect(result).toEqual({ name: 'Plain Test' })
        expect(result._id).toBeUndefined()
      },
      complete: () => done(),
    })
  })

  it('should return null or undefined if input is null or undefined', done => {
    mockCallHandler = {
      handle: () => of(null),
    }

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      next: result => {
        expect(result).toBeNull()
      },
      complete: () => {
        // Test undefined case
        mockCallHandler = { handle: () => of(undefined) }
        interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
          next: result => {
            expect(result).toBeUndefined()
          },
          complete: () => done(),
        })
      },
    })
  })
})
