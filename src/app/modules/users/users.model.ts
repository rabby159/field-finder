import { model, Schema } from 'mongoose'
import config from '../../config'
import bcrypt from 'bcrypt'
import { TUsers } from './users.interface'
// import { UsersRole } from './users.constant'

const usersSchema = new Schema<TUsers>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

usersSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const users = this // doc
  // hashing password and save into DB
  users.password = await bcrypt.hash(
    users.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// set '' after saving password
usersSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const Users = model<TUsers>('Users', usersSchema)
