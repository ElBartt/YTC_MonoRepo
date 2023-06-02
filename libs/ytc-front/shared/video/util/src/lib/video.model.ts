import { z } from 'zod';

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  channel_id: z.string(),
});

export type VideoType = z.infer<typeof VideoSchema>;
