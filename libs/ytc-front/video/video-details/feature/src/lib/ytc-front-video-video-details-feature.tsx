import { CommentList } from '@ytc/ytc-front/shared/comment/feature';
import { getCommentList } from '@ytc/ytc-front/video/video-details/data-access';
import { CommentType } from '@ytc/shared/models/util';

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
    <>
      <div className="flex justify-center mx-auto">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{video.title}</h2>
            <p>{format(parseISO(video.date), 'MM/dd/yyyy')}</p>
          </div>
          <figure>
            <img src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`} alt="Shoes" />
          </figure>
        </div>
      </div>
      <CommentList comments={commentList}></CommentList>
    </>
  );
}

export default YtcFrontVideoVideoDetailsFeature;
