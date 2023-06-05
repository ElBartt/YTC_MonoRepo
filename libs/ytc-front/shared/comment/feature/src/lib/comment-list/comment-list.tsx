import { useState } from 'react';
import { CommentType } from '@org/ytc-front/shared/comment/utils';

export interface CommentListProps {
  comments: CommentType[];
}

export function CommentList(props: CommentListProps) {
  const [showCommentReply, SetShowCommentReply] = useState(false);

  function handleShowComment() {
    SetShowCommentReply(!showCommentReply);
    console.log('show comment ' + showCommentReply);
  }

  return (
    <div className="card-body">
          <h2 className="card-title">John Doe</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleShowComment}>
              Answer
            </button>
          </div>
          {showCommentReply && (
            <div>
              <div className="card-actions justify-end">
                <textarea
                  placeholder="Type your answer..."
                  className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                ></textarea>
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          )}
        </div>
  );
}
