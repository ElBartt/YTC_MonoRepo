import { VideoType } from '@org/ytc-front/shared/video/util';
import styles from './comment-list.module.css';

/* eslint-disable-next-line */
export interface CommentListProps {
  video: VideoType;
}

export function CommentList(props: CommentListProps) {
  return (
    <div className={styles['container']}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{props.video.title}</h2>
          <p>{props.video.date}</p>
        </div>
        <figure>
          <img src="https://i.ytimg.com/vi/ByZRFhqORnA/maxresdefault.jpg" alt="Shoes" />
        </figure>
      </div>
    </div>
  );
}
