import { TQuarter } from '../quarterYear/quarterYear.interface'
import { Users } from './users.model'

// const findLastUserId = async (year: string, quarterCode: string) => {
//   const lastUser = await Users.findOne(
//     {
//       role: 'user',
//       id: { $regex: `^${year}${quarterCode}` }
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean()

//   //203001   0001
//   return lastUser?.id ? lastUser.id : undefined
// }

// export const generateUserId = async (payload: TQuarter) => {
//   // first time 0000
//   //0001  => 1
//   const { year, code } = payload
//   let currentId = (0).toString() //default value 0000

//   //2023 01 0001
//   const lastUserId = await findLastUserId(year, code)
//   // const lastUserYear = lastUserId?.substring(0, 4) //2023
//   // const lastUserQuarterCode = lastUserId?.substring(4, 6) //01

//   // const currentYear = payload.year
//   // const currentQuarterCode = payload.code

//   if (
//     lastUserId
//     // && lastUserYear === currentYear &&
//     // lastUserQuarterCode === currentQuarterCode
//   ) {
//     currentId = lastUserId.substring(6)
//   }

//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

//   incrementId = `${year}${code}${incrementId}`

//   return incrementId
// }

const findLastUserId = async () => {
  const lastUser = await Users.findOne(
    { role: 'user' }, 
    { id: 1, _id: 0 }
  )
  .sort({ createdAt: -1 }) // Sort by creation date
  .lean()

  return lastUser?.id || undefined
}

export const generateUserId = async (payload: TQuarter) => {
  let currentId = (0).toString() // Default value

  const lastUserId = await findLastUserId()
  const lastUserYear = lastUserId?.substring(0, 4) //2023
  const lastUserQuarterCode = lastUserId?.substring(4, 6) //01

  const currentYear = payload.year
  const currentQuarterCode = payload.code

  if (
    lastUserId &&
    lastUserYear === currentYear &&
    lastUserQuarterCode === currentQuarterCode
  ) {
    currentId = lastUserId.substring(6) // Increment this portion of ID
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`

  // Ensure unique ID generation
  let isUnique = false
  let retries = 0
  const maxRetries = 5

  while (!isUnique && retries < maxRetries) {
    const existingUser = await Users.findOne({ id: incrementId })
    
    if (!existingUser) {

      //nothing
      isUnique = true
    } else {
      // If the ID already exists, increment the ID and retry
      incrementId = (Number(incrementId.slice(6)) + 1).toString().padStart(4, '0')
      incrementId = `${payload.year}${payload.code}${incrementId}`
      retries++
      console.warn(`Duplicate ID found, retrying... (${retries}/${maxRetries})`)
    }

    if (retries >= maxRetries) {
      throw new Error('Failed to generate unique user ID after multiple retries')
    }
  }

  return incrementId
}
