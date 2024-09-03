export type UserName = {
    firstName: string
    middleName?: string
    lastName: string
  }

export type TUser = {
    id: string,
    password: string,
    needPasswordChange: boolean, 
    role :  'user' | 'admin',
    name: UserName,
    email: string,
    address: string
    isDeleted: boolean
}