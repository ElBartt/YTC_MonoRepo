import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string(),
  commenter: z.string(),
  comment: z.string(),
  date: z.string().transform((str) => new Date(str)), // added date field
  relevance_order: z.number().int(), // added relevance_order field
  like_count: z.number().int(), // added like_count field
  reply_count: z.number().int(), // added reply_count field
  gpt: z.string(), // updated gpt field to be 
  unwanted: z.number().transform(val => !!val), // added unwanted field
  question: z.number().transform(val => !!val), // added question field
  feedback: z.number().transform(val => !!val), // added feedback field
  idea: z.number().transform(val => !!val), // added idea field
  collaboration: z.number().transform(val => !!val), // added collaboration field
  video_id: z.string(), // added video_id field
});

export type CommentType = z.infer<typeof CommentSchema>;