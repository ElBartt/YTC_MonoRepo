import { CommentList } from '@org/ytc-front/shared/comment/feature';

/* eslint-disable-next-line */
export interface YtcFrontVideoVideoDetailsFeatureProps {}

export function YtcFrontVideoVideoDetailsFeature(props: YtcFrontVideoVideoDetailsFeatureProps) {
  /*
  TODO : All the page for the video details (comments, video, stats)
  */
  return (
    <div>
      {/* call <Video><Stats><CommentList> */}
      <CommentList
        video={{
          id: '123',
          title: 'My Video',
          date: '2022-01-01',
          channel_id: '456',
        }}
      ></CommentList>
    </div>
  );
}

export default YtcFrontVideoVideoDetailsFeature;
