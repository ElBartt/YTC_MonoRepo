/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

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
export interface Comment {
    id: string;
    commenter: string;
    comment: string;
    date: Date;
    relevance_order: number;
    like_count: number;
    reply_count: number;
    gpt: string;
    unwanted: boolean | 0 | 1;
    question: boolean | 0 | 1;
    feedback: boolean | 0 | 1;
    idea: boolean | 0 | 1;
    collaboration: boolean | 0 | 1;
    video_id: string;
}