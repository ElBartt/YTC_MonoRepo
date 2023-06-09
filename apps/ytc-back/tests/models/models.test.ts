/* 
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

import { ChannelType, CommentType, VideoType } from "@ytc/shared/models/util";

describe("CommentType", () => {
    it("should have the correct properties", () => {
        const comment: CommentType = {
            id: "123",
            commenter: "John",
            comment: "Great video!",
            date: new Date(),
            relevance_order: 0,
            like_count: 0,
            reply_count: 0,
            gpt: "This is a GPT response.",
            unwanted: false,
            question: false,
            feedback: false,
            idea: false,
            collaboration: false,
            video_id: "456",
        };
        
        expect(comment).toHaveProperty("id");
        expect(comment).toHaveProperty("commenter");
        expect(comment).toHaveProperty("comment");
        expect(comment).toHaveProperty("date");
        expect(comment).toHaveProperty("relevance_order");
        expect(comment).toHaveProperty("like_count");
        expect(comment).toHaveProperty("reply_count");
        expect(comment).toHaveProperty("gpt");
        expect(comment).toHaveProperty("unwanted");
        expect(comment).toHaveProperty("question");
        expect(comment).toHaveProperty("feedback");
        expect(comment).toHaveProperty("idea");
        expect(comment).toHaveProperty("collaboration");
        expect(comment).toHaveProperty("video_id");
    });
});

describe("VideoType", () => {
    it("should have the correct properties", () => {
        const video: VideoType = {
            id: "456",
            title: "This is a video",
            date: "09/09/2021",
            channel_id: "789",
        };

        expect(video).toHaveProperty("id");
        expect(video).toHaveProperty("title");
        expect(video).toHaveProperty("date");
        expect(video).toHaveProperty("channel_id");
    });
});

describe("ChannelType", () => {
    it("should have the correct properties", () => {
        const channel: ChannelType = {
            id: "789",
            name: "Example Channel",
            thumbnail: "https://example.com/channel.jpg",
            user_id: 1,
        };

        expect(channel).toHaveProperty("id");
        expect(channel).toHaveProperty("name");
        expect(channel).toHaveProperty("thumbnail");
        expect(channel).toHaveProperty("user_id");
    });
});

