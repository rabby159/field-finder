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
    user: z.object({
      name: userNameValidationSchema,
      email: z.string().email('Invalid email address'),
      address: z.string().min(1, 'Address is required'),
      quarterYear: z.string(),
    }),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'first name is must required')
    .max(15, 'first name maximum length is 15')
    .optional(),

  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'last name is must required')
    .max(15, 'last name maximum length is 15')
    .optional(),
})

const updateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(15),
    user: z.object({
      name: updateUserNameValidationSchema,
      email: z.string().email('Invalid email address').optional(),
      address: z.string().min(1, 'Address is required').optional(),
      quarterYear: z.string().optional(),
    }),
  }),
})

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
}
