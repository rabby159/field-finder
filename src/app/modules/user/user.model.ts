import { model, Schema } from 'mongoose'
import { TUser, UserModel, UserName } from './user.interface'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [15, 'First name maximum length is 15'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'last name is required'],
    maxlength: [15, 'Last name maximum length is 15'],
  },
})

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    users: {
      type: Schema.Types.ObjectId,
      required: [true, 'ID is must require'],
      unique: true,
      ref: 'Users',
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

// virtual
userSchema.virtual('fullName').get(function () {
    return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName
  })
  
//   // Query Middleware
//   userSchema.pre('find', function (next) {
//     this.find({ isDeleted: { $ne: true } })
//     next()
//   })
  
//   userSchema.pre('findOne', function (next) {
//     this.find({ isDeleted: { $ne: true } })
//     next()
//   })
  
  userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
  })

//creating a custom static method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id })
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
