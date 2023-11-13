import {Comment, getCommentType} from '@ytc/ytc-front/shared/comment/ui';
import {CommentType} from '@ytc/shared/models/util';

export interface CommentListProps {
    comments: CommentType[];
    filter?: string;
}

export function CommentList({comments, filter}: CommentListProps) {
    return (
        <>
            {comments.filter(value => {
                if (filter?.length === 0 || filter === 'totalComments') return true;
                return filter?.toUpperCase().includes(getCommentType(value).toUpperCase());
            }).map(com => (
                <Comment key={com.id} comment={com}/>
            ))}
        </>
    );
}
