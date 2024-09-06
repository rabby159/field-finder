export type TUsers = {
    id: string,
    password: string,
    needPasswordChange: boolean, 
    role :  'user' | 'admin',
    isDeleted: boolean,
}

