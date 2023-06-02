import { Button } from '@org/shared/ui-components';
import { VideoType } from '@org/ytc-front/shared/video/util';
import { getVideoList } from '@org/ytc-front/video-list/data-access';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface YtcFrontVideoListFeatureProps {}

export function YtcFrontVideoListFeature(props: YtcFrontVideoListFeatureProps) {
  const [videoList, setVideoList] = useState<VideoType[]>([]);

  useEffect(() => {
    console.warn('useEffect is triggered!');
    getVideoList().subscribe((videosList: VideoType[]) => {
      setVideoList(videosList);
    });
  }, []);

  return (
    <div>
      <h1>A page to see your Youtube videos!</h1>
      {videoList.map((video: VideoType) => {
        return (
          <div key={video.id} className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
              <img src="https://miro.medium.com/v2/resize:fit:1200/0*nmHC1101iCu3OtYU" alt="NOP" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{video.title}</h2>
              <p>{format(parseISO(video.date), 'MM/dd/yyyy')}</p>
              <div className="card-actions justify-end">
                <Button
                  onClick={() => {
                    return;
                  }}
                  buttonType="btn-primary"
                >
                  Check comments
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
