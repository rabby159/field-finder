import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'first name is must required')
    .max(15, 'first name maximum length is 15'),

  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'last name is must required')
    .max(15, 'last name maximum length is 15'),
})

const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(15),
    users: z.object({
      name: userNameValidationSchema,
      email: z.string().email('Invalid email address'),
      phone: z.string().min(1, 'Contact number is required'),
      address: z.string().min(1, 'Address is required'),
      quarterYear: z.string(),
    }),
  }),
})

export const userValidation = {
  createUserValidationSchema,
}
