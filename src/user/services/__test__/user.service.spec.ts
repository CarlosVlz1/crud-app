import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../user.service'
import { User } from './../../schemas/user.schema'
import { getModelToken } from '@nestjs/mongoose'
import { USERS_MOCK, USER_MOCK } from '../__fixtures__/common'
import { RequestUserDto } from 'src/user/dtos/request-user.dto'

// Mock del modelo de Mongoose
const mockUserModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn().mockResolvedValue(USER_MOCK),
  findByIdAndDelete: jest.fn(),
}

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll()', () => {
    it('should find all users', async () => {
      mockUserModel.find.mockResolvedValue(USERS_MOCK)
      const result = await service.findAll()
      expect(result).toEqual(USERS_MOCK)
      expect(mockUserModel.find).toHaveBeenCalled()
      expect(mockUserModel.find).toHaveBeenCalledTimes(1)
    })
  })

  describe('findOne()', () => {
    it('should return a user by id', async () => {
      const userId = '1'
      mockUserModel.findById.mockResolvedValue(USER_MOCK)
      const result = await service.findOne(userId)
      expect(result).toEqual(USER_MOCK)
      expect(mockUserModel.findById).toHaveBeenCalledWith(userId)
    })
  })

  describe('create()', () => {
    it('should create a new user', async () => {
      mockUserModel.create.mockResolvedValue(USER_MOCK)
      const result = await service.create(USER_MOCK)
      expect(result).toEqual(USER_MOCK)
      expect(mockUserModel.create).toHaveBeenCalledWith(USER_MOCK)
    })
  })

  describe('update()', () => {
    it('should update a user', async () => {
      const userId = '1'
      const userData: RequestUserDto = { ...USER_MOCK }
      const result = await service.update(userId, userData)
      expect(result).toEqual(USER_MOCK)
    })
  })

  describe('deleteById()', () => {
    it('should delete a user by id', async () => {
      const userId = '1'
      await service.deleteById(userId)
      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith(userId)
    })
  })
})
