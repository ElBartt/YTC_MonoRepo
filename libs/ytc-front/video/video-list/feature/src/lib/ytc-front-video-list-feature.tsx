import { Card } from '@org/shared/ui-components';
import { VideoType } from '@org/ytc-front/shared/video/util';
import { getVideoList } from '@org/ytc-front/video/video-list/data-access';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function YtcFrontVideoListFeature() {
  const [videoList, setVideoList] = useState<VideoType[]>([]);

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getVideoList().subscribe((videosList: VideoType[]) => {
      setVideoList(videosList);
    });
  }, []);

  return (
    <div>
      <h1>A page to see your Youtube videos!</h1>
      {videoList.map((video: VideoType) => {
        return (
          <Card
            key={video.id}
            btnText={'Check comments'}
            cardTitle={video.title}
            imgUrl={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
            subTitle={format(parseISO(video.date), 'MM/dd/yyyy')}
            onClick={() => navigate(`${video.id}`)}
          ></Card>
        );
      })}
    </div>
  );
}
