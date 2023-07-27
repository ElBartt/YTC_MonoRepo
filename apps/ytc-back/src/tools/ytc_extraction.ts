
import { writeFile } from 'fs';
import { youtube_v3 } from 'googleapis';
import { join } from 'path';
import { YoutubeAPIService } from "../services/youtube.service";
import { YoutubeFilteredResponse } from '../types/interface';

export class Extraction {
    async Start() {
        let pageToken = "";
        for (let i = 0; i < 4; i++) {
            const youtubeComments = await this.MakeYoutubeRequest(pageToken);
            await this.ExtractComments(youtubeComments);
            pageToken = youtubeComments.nextPageToken;
        }
    }

    async MakeYoutubeRequest(pageToken = "") {
        const youtubeAPI = YoutubeAPIService.getInstance();
        const youtubeComments = await youtubeAPI.GetYoutubeComments("KAQlI52dYQE", {
            maxResults: 100,
            pageToken: pageToken
        });

        return youtubeComments;
    }

    async ExtractComments(youtubeComments: YoutubeFilteredResponse<youtube_v3.Schema$CommentThread[]>) {
        // Create a new object with the comments date and comments text
        let comments = youtubeComments.items.map(comment => ({
            date: comment.snippet?.topLevelComment?.snippet?.publishedAt || '',
            comment: comment.snippet?.topLevelComment?.snippet?.textDisplay || '',
        }));

        comments.forEach(comment => {
            comment.comment = comment.comment
                // remove non-latin characters      
                .replace(/[\u0250-\ue007]/g, '')
                // remove emojis
                .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
                // remove line breaks
                .replace(/\r?\n|\r/g, ' ')
                // remove multiple spaces     
                .replace(/\s+/g, ' ')
                // remove trailing spaces
                .trim();
        });

        // remove empty comments and comments that don't contain letters
        comments = comments.filter(comment => comment.comment.length > 0 && comment.comment.match(/[a-z]/i));

        // transform the list of comment into a csv file in typescript
        const csv = this.ArrayToCSV(comments);

        // output in a file at the root of the project
        const path = join(__dirname, '..', '..', '..');
        const filePath = join(path, 'comments.csv');
        writeFile(filePath, csv, { flag: 'a' }, err => {
            if (err) {
                console.error(err);
            } else {
                console.log(`File written successfully!\nPath: ${filePath}`);
            }
        });
    }

    ArrayToCSV = (myJSON: any[]) => {
        const escapeValue = (value: any) => {
            const content = (() => {
                if (!value) {
                    return "";
                }
                if (typeof value === "object") {
                    return JSON.stringify(value).replace(/"/g, '""')
                }
                return value.toString();
            })()
            return `"${content}"`
        };

        const fieldNamesArray: string[] = [...new Set(
            myJSON.reduce((acc, arrayEntry) => {
                return [...acc, ...Object.keys(arrayEntry)];
            }, [])
        )] as any[];

        const rows = myJSON.map(arrayEntry => {
            return fieldNamesArray.map((field) => {
                return escapeValue(arrayEntry[field]);
            }).join(',');
        }).join('\n');

        return `${rows}\n`;
    };
}
