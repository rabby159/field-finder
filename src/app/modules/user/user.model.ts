import { model, Schema } from 'mongoose'
import { TUser, UserName } from './user.interface'
import { UserRole } from './user.constant'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'first name is required'],
    maxlength: [15, 'first name maximum length is 15'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'last name is required'],
    maxlength: [15, 'last name maximum length is 15'],
  },
})

const userSchema = new Schema<TUser>(
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
      enum: UserRole,
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    quarterYear: {
      type: Schema.Types.ObjectId,
      ref: 'QuarterYear',
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

export const User = model<TUser>('User', userSchema)
