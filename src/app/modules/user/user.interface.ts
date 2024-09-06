import { Model, Types } from 'mongoose'

export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TUser = {
  id: string
  users: Types.ObjectId
  password: string
  name: UserName
  email: string
  address: string
  quarterYear: Types.ObjectId
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUser | null>
}
