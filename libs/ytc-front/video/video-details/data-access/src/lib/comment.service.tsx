import { CommentSchema, CommentType } from "@org/ytc-front/shared/comment/utils";
import { Observable, map, tap } from "rxjs";
import { AjaxResponse, ajax } from "rxjs/ajax";


// TODO: Move theses variables to a better place
const backendUrl = 'http://localhost:1234';
const apiKey = 'BczuaAjc7nUf-eiCSp1lpTjHThvdrqEM88Esgs_N5R6bZpQPv-OxkT_aInwwASP5';
const videoId = "6nFlKS-15X8";

export function getCommentList(): Observable<CommentType[]> {
    return ajax<CommentType[]>({
        url: `${backendUrl}/comments?videoId=${videoId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        },
    }).pipe(
        tap(console.warn),
        map(({ response }: AjaxResponse<CommentType[]>) => {
            if (Array.isArray(response)) {
                return response.map((comment: CommentType) => CommentSchema.parse(comment));
            } else {
                throw new Error('Response is not an array.');
            }
        }));
}