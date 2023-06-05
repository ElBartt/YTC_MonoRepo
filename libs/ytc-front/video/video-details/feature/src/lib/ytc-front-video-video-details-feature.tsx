import { CommentList } from '@org/ytc-front/shared/comment/feature';
import { CommentType } from '@org/ytc-front/shared/comment/utils';
import { VideoType } from '@org/ytc-front/shared/video/util';
import { getCommentList } from '@org/ytc-front/video/video-details/data-access';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface YtcFrontVideoVideoDetailsFeatureProps {
  video: VideoType;
}

export function YtcFrontVideoVideoDetailsFeature(props: YtcFrontVideoVideoDetailsFeatureProps) {
  const [showCommentReply, SetShowCommentReply] = useState(false);
  const [, setCommentList] = useState<CommentType[]>([]);

  useEffect(() => {
    getCommentList().subscribe((commentList: CommentType[]) => {
      setCommentList(commentList);
    });
  }, []);

  function handleShowComment() {
    SetShowCommentReply(!showCommentReply);
    console.log('show comment ' + showCommentReply);
  }

  /*
  TODO : All the page for the video details (comments, video, stats)
  */
  return (
    <div>
      {/* call <Video><Stats><CommentList> */}
      {/* replace by card element from shared/ui-components */}
      {/*<CommentList
        video={{
          id: props.video.id,
          title: props.video.title,
          date: props.video.date,
          channel_id: props.video.channel_id,
        }}
      ></CommentList>*/}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{props.video.title}</h2>
          <p>{props.video.date}</p>
        </div>
        <figure>
          <img src={`https://i.ytimg.com/vi/${props.video.id}/maxresdefault.jpg`} alt="Shoes" />
        </figure>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default YtcFrontVideoVideoDetailsFeature;
