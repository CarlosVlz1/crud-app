import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class ResponseUserDto extends OmitType(UserDto, ['id'] as const) {}
