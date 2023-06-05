import { useState } from "react";
import { CommentType } from "@org/ytc-front/shared/comment/utils";

export interface CommentProps {
    comment: CommentType;
}

export function Comment(props: CommentProps) {
  const [showCommentReply, SetShowCommentReply] = useState(false);
  const com = props.comment;

  function handleShowComment() {
    SetShowCommentReply(!showCommentReply);
    console.log('show comment ' + showCommentReply);
  }
  return (
    <div className="card-body">
      <h2 className="card-title" dangerouslySetInnerHTML={{ __html: com.commenter }}></h2>
      <p dangerouslySetInnerHTML={{__html: com.comment}}></p>
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
