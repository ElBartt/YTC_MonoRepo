import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string(),
  commentid: z.string(),
  commenter: z.string(),
  comment: z.string(),
  gpt: z.string(),
  spam: z.boolean(),
  respond: z.boolean(),
});

export type CommentType = z.infer<typeof CommentSchema>;