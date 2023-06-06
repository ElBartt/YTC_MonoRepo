import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  is_admin: z.number().transform(val => val === 1),
});

export type UserType = z.infer<typeof UserSchema>;
