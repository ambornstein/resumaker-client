import { z } from 'zod'

export const registrationSchema = z
  .object({
    email: z.email().max(255),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
    firstName: z.string().max(100),
    lastName: z.string().max(100),
    roles: z.array(z.string()),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })
  .strict()
