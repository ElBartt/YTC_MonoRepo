import { ROUTES } from '@ytc/shared/ytc-front/routes/util';
import { z } from 'zod';

/**
 * An interface representing statistics for a collection of comments.
 * @property {number} totalComments - The total number of comments.
 * @property {number} totalUnwanted - The total number of unwanted comments.
 * @property {number} totalQuestion - The total number of comments that ask a question.
 * @property {number} totalFeedback - The total number of comments that provide feedback.
 * @property {number} totalIdea - The total number of comments that suggest an idea.
 * @property {number} totalCollaboration - The total number of comments that suggest collaboration.
 */
export const StatisticsSchema = z.object({
    totalComments: z.number(),
    totalUnwanted: z.number(),
    totalQuestion: z.number(),
    totalFeedback: z.number(),
    totalIdea: z.number(),
    totalCollaboration: z.number(),
});

export type StatisticsType = z.infer<typeof StatisticsSchema>;

export type StatisticsLabel = 'COMMENTS' | 'UNWANTED' | 'QUESTIONS' | 'FEEDBACK' | 'IDEAS' | 'COLLABORATION';

export const LABEL_STATS_LABELS: Record<keyof StatisticsType, StatisticsLabel> = {
    totalComments: 'COMMENTS',
    totalUnwanted: 'UNWANTED',
    totalQuestion: 'QUESTIONS',
    totalFeedback: 'FEEDBACK',
    totalIdea: 'IDEAS',
    totalCollaboration: 'COLLABORATION',
};

export type SourceType = typeof ROUTES.pChannelId | typeof ROUTES.pVideoId;
