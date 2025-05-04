import { RequestUserDto } from 'src/user/dtos/request-user.dto'
import { ResponseUserDto } from 'src/user/dtos/response-user.dto'

export const userRoleMock = 'GUEST'

export const USER_MOCK: ResponseUserDto = {
  name: 'Juan',
  lastName: 'Velez',
  email: 'jv@mail.com',
  phone: '23425141414',
  role: userRoleMock,
}

export const USERS_MOCK: RequestUserDto[] = [
  {
    name: 'Juan',
    lastName: 'Velez',
    email: 'jv@mail.com',
    phone: '23425141414',
    role: 'COMMON_USER',
  },
  {
    name: 'Pedro',
    lastName: 'Velez',
    email: 'jv@mail.com',
    phone: '23425141414',
    role: 'COMMON_USER',
  },
]
