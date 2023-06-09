/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { z } from 'zod';

/**
 * Represents a comment in the database.
 * @property {string} id - The ID of the comment.
 * @property {string} commenter - The name of the commenter.
 * @property {string} comment - The text of the comment.
 * @property {Date} date - The date the comment was posted.
 * @property {number} like_count - The number of likes the comment has.
 * @property {number} reply_count - The number of replies the comment has.
 * @property {string} gpt - The GPT response for the comment.
 * @property {boolean} unwanted - Whether the comment is considered unwanted.
 * @property {boolean} question - Whether the comment is a question.
 * @property {boolean} feedback - Whether the comment is feedback.
 * @property {boolean} idea - Whether the comment is an idea.
 * @property {boolean} collaboration - Whether the comment is a collaboration request.
 * @property {string} video_id - The ID of the video the comment belongs to.
 */
export const CommentSchema = z.object({
  id: z.string(),
  commenter: z.string(),
  comment: z.string(),
  date: z.string(),
  relevance_order: z.number().int(),
  like_count: z.number().int(),
  reply_count: z.number().int(),
  gpt: z.string(),
  unwanted: z.number().transform(data => !!data),
  question: z.number().transform(data => !!data),
  feedback: z.number().transform(data => !!data),
  idea: z.number().transform(data => !!data),
  collaboration: z.number().transform(data => !!data),
  video_id: z.string(),
});

export type CommentType = z.infer<typeof CommentSchema>;
