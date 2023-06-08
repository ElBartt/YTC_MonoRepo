import { CommentType } from '@ytc/ytc-front/shared/comment/utils';

export interface CommentProps {
  comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="card-body">
      <h2 className="card-title" dangerouslySetInnerHTML={{ __html: comment.commenter }}></h2>
      <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
    </div>
  );
}
