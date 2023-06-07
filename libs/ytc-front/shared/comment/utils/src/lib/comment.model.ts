import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string(),
  commenter: z.string(),
  comment: z.string(),
  date: z.string().transform(str => new Date(str)),
  relevance_order: z.number().int(),
  like_count: z.number().int(),
  reply_count: z.number().int(),
  gpt: z.string(),
  unwanted: z.boolean(),
  question: z.boolean(),
  feedback: z.boolean(),
  idea: z.boolean(),
  collaboration: z.boolean(),
  video_id: z.string(),
});

export type CommentType = z.infer<typeof CommentSchema>;
