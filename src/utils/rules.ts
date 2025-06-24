import z from 'zod';

export const baseSchema = z.object({
  name: z.string().nonempty('Name cannot be blank'),
  email: z.string().email('Invalid email').nonempty('Email cannot be blank'),
  password: z.string().nonempty('Password cannot be blank'),
  phone: z.string().regex(/^\d{10,11}$/, 'Invalid phone number'),
  birthday: z.string().nonempty('Birthday cannot be blank'),
  gender: z.boolean(),
  skill: z.array(z.string()).optional(),
  certification: z.array(z.string()).optional(),
  search: z.string().optional()
});

export const RegisterSchema = baseSchema.pick({
  name: true,
  email: true,
  password: true,
  phone: true,
  birthday: true,
  gender: true,
  skill: true,
  certification: true
});

export const SigninSchema = baseSchema.pick({
  email: true,
  password: true
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
