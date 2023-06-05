import { CommentType } from '@org/ytc-front/shared/comment/utils';
import { Comment } from '@org/ytc-front/shared/comment/ui';

export interface CommentListProps {
  comments: CommentType[];
}

export function CommentList(props: CommentListProps) {
  console.log("props.comments");
  console.log(props.comments);
  return (
  <>
    {props.comments.map((com) => {
      return <Comment key={com.id} comment={com} />;
    }
    )}
  </>
  );
}
