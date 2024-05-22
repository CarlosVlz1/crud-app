import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    // Método para crear un nuevo usuario
    async create(user: CreateUserDto) {
        return this.userModel.create(user); 
    }

    async update(id: string, user: UpdateUserDto){
        return this.userModel.findByIdAndUpdate(id, user, {
            new: true,
        });
    }

    async findAll(){
        return this.userModel.find();
    }

    async findOne(id: string){
        return this.userModel.findById(id);
    }

    async deleteById(id: string){
        return this.userModel.findByIdAndDelete(id);
    }
}
