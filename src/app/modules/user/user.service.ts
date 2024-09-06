import QueryBuilder from '../../builder/QueryBuilder'
import { userSearchableFields } from './user.constant'
import { User } from './user.model'

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find().populate('quarterYear'), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await userQuery.modelQuery
  return result
}

export const UserServices = {
  getAllUserFromDB,
}
