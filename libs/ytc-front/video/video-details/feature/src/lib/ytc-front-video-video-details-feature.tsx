import { CommentList } from '@ytc/ytc-front/shared/comment/feature';
import { CommentType } from '@ytc/ytc-front/shared/comment/utils';
import { getCommentList } from '@ytc/ytc-front/video/video-details/data-access';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export function YtcFrontVideoVideoDetailsFeature() {
  const { id } = useParams();
  const { video, apiKey } = useLocation().state;
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  useEffect(() => {
    id &&
      getCommentList(id, apiKey).subscribe((comList: CommentType[]) => {
        setCommentList(comList);
      });
  }, []);

  /*
  TODO : All the page for the video details (comments, video, stats)
  */
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{video.title}</h2>
          <p>{format(parseISO(video.date), 'MM/dd/yyyy')}</p>
        </div>
        <figure>
          <img src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} alt="Shoes" />
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
        <CommentList comments={commentList}></CommentList>
      </div>
    </div>
  );
}

export default YtcFrontVideoVideoDetailsFeature;
