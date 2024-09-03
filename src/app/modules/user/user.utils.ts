import { User } from "./user.model"


const findLastUserId = async () => {
    const lastUser = await User.findOne(
      {
        role: 'user',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean()
  
    //203001   0001
    return lastUser?.id ? lastUser.id : undefined
  }
  
  export const generateStudentId = async (payload: TAcademicSemester) => {
    // first time 0000
    //0001  => 1
    let currentId = (0).toString() //default value 0000
  
    //2023 01 0001
    const lastUserId = await findLastUserId()
    const lastUserYear = lastUserId?.substring(0, 4) //2023
    const lastUserQuarterCode = lastUserId?.substring(4, 6) //01
  
    const currentYear = payload.year
    const currentSemesterCode = payload.code
  
    if (
      lastStudentId &&
      lastStudentYear === currentYear &&
      lastStudentSemesterCode === currentSemesterCode
    ) {
      currentId = lastStudentId.substring(6)
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  
    incrementId = `${payload.year}${payload.code}${incrementId}`
  
    return incrementId
  }