import { writeFile } from 'fs';
import { youtube_v3 } from 'googleapis';
import { join } from 'path';
import { YoutubeAPIService } from '../services/youtube.service';
import { YoutubeFilteredResponse } from '../types/interface';

export class Extraction {
    async Start() {
        // First fournée
        // const videoIdList = [
        //     "mqBn7jJ_p08", "2QYCprGIslw", "ZlRjN4VuPBk", "JbkmJQcaN5c",
        //     "8T4lqk5tqpo", "44tUsO22Tgk", "3Jj47WiZEjo", "cjSSxMksHVE",
        //     "b71LNFaP6aQ", "V6gabUm9sWw", "VLPj8ayqgY4", "mBjGWk_A1bE",
        //     "I1s9gMxL3IE", "23Ic9SN3srI", "oty1Ek7Iu0Y", "TTs865ybLKQ",
        //     "TJVJuMKZqfo", "VF5fEiLZ9qw", "aKsxgnHNCfU", "YO2QqBLfmXM",
        //     "aH77WLlx8kI", "6CxGCYxa2hY", "Srxf3yxSfHA", "GbkxChQSEmw"
        // ];

        // Second fournée
        const videoIdList = [
            '7J1R4EFTplw',
            '0oWQh2FaEzM',
            'ucqdQbLROtQ',
            'iWYBiRM0J7I',
            'pDr88_c_9U8',
            '6DnnC1RZHNg',
            'ZXt_YqpaBik',
            'KYnduqCMylY',
        ];

        for (const videoId of videoIdList) {
            await this.ExtractCommentsFromVideo(videoId);
        }
    }

    async ExtractCommentsFromVideo(videoId: string) {
        let pageToken = '';
        for (let i = 0; i < 3; i++) {
            const youtubeComments = await this.MakeYoutubeRequest(videoId, pageToken);
            await this.ExtractComments(youtubeComments);
            const nextPageToken = youtubeComments.nextPageToken;
            if (!nextPageToken) {
                break;
            }
            pageToken = youtubeComments.nextPageToken;
        }
    }

    async MakeYoutubeRequest(videoId: string, pageToken = '') {
        const youtubeAPI = YoutubeAPIService.getInstance();
        const youtubeComments = await youtubeAPI.GetYoutubeComments(videoId, {
            maxResults: 100,
            pageToken: pageToken,
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
                .replace(
                    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                    '',
                )
                // remove line breaks
                .replace(/\r?\n|\r/g, ' ')
                // remove multiple spaces
                .replace(/\s+/g, ' ')
                // remove trailing spaces
                .trim();

            // transform date "2023-05-21T19:42:53Z" into "2023-05-21 19:42:53"
            comment.date = comment.date.replace('T', ' ').replace('Z', '');
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

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    ArrayToCSV = (myJSON: any[]) => {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const escapeValue = (value: any) => {
            const content = (() => {
                if (!value) {
                    return '';
                }
                if (typeof value === 'object') {
                    return JSON.stringify(value).replace(/"/g, '""');
                }
                return value.toString();
            })();
            return `"${content}"`;
        };

        const fieldNamesArray: string[] = [
            ...new Set(
                myJSON.reduce((acc, arrayEntry) => {
                    return [...acc, ...Object.keys(arrayEntry)];
                }, []),
            ),
        ] as string[];

        const rows = myJSON
            .map(arrayEntry => {
                return fieldNamesArray
                    .map(field => {
                        return escapeValue(arrayEntry[field]);
                    })
                    .join(',');
            })
            .join('\n');

        return `${rows}\n`;
    };
}

const extraction = new Extraction();
extraction.Start();
