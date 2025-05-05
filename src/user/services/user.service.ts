import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../schemas/user.schema'
import { ResponseUserDto } from '../dtos/response-user.dto'
import { RequestUserDto } from '../dtos/request-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findAll(): Promise<ResponseUserDto[]> {
    return await this.userModel.find()
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    return await this.userModel.findById(id)
  }

  async create(user: RequestUserDto): Promise<ResponseUserDto> {
    return await this.userModel.create(user)
  }

  async update(id: string, user: RequestUserDto): Promise<ResponseUserDto> {
    return await this.userModel.findByIdAndUpdate(id, user)
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}
