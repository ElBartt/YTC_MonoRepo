import {z} from "zod";

export const ChannelSchema = z.object({
    id: z.string(),
    name: z.string(),
    thumbnail: z.string(),
    user_id: z.number()
});

export type ChannelType = z.infer<typeof ChannelSchema>;
