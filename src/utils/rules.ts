import z from 'zod';

const baseSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email cannot be blank'),
  password: z.string().nonempty('Password cannot be blank'),
  confirmPassword: z.string().nonempty('Confirm password cannot be blank'),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, 'Phone must be a valid phone number')
    .optional(),
  fullName: z.string().nonempty('Name cannot be blank'),
  user: z.string().nonempty('User cannot be blank')
});

export const RegisterSchema = z.object({
  name: z.string().nonempty('Name cannot be blank'),
  email: z.string().email('Invalid email').nonempty('Email cannot be blank'),
  password: z.string().nonempty('Password cannot be blank'),
  phone: z.string().regex(/^\d{10,11}$/, 'Invalid phone number'),
  birthday: z.string().nonempty('Birthday cannot be blank'),
  gender: z.boolean(),
  skill: z.array(z.string()).optional(),
  certification: z.array(z.string()).optional()
  // role will not be in schema when signup, only used for backend or admin
});

export const SigninSchema = baseSchema.pick({
  email: true,
  password: true
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
