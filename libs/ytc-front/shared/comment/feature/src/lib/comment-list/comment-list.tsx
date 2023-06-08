import { Comment } from '@ytc/ytc-front/shared/comment/ui';
import { CommentType } from '@ytc/ytc-front/shared/comment/utils';

export interface CommentListProps {
  comments: CommentType[];
}

export function CommentList(props: CommentListProps) {
  return (
    <>
      {props.comments.map(com => (
        <Comment key={com.id} comment={com} />
      ))}
    </>
  );
}
