import { VideoType } from '@ytc/shared/models/util';
import { Card } from '@ytc/shared/ui-components-react';
import { getVideoList } from '@ytc/ytc-front/video/video-list/data-access';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom';

export function YtcFrontVideoListFeature() {
    const { id } = useParams();
    const { apiKey } = useLocation().state;
    const { t } = useTranslation();
    const [videoList, setVideoList] = useState<VideoType[]>([]);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        id &&
            getVideoList(id, apiKey).subscribe((videosList: VideoType[]) => {
                setVideoList(videosList);
            });
    }, [apiKey, id]);

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
            {videoList.map((video: VideoType) => {
                return (
                    <Card
                        key={video.id}
                        btnText={t('video.btnCardVideo')}
                        cardTitle={video.title}
                        imgUrl={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
                        subTitle={format(parseISO(video.date), 'MM/dd/yyyy')}
                        onClick={() => navigate(`/videos/details/${video.id}`, { state: { video, apiKey } })}
                    ></Card>
                );
            })}
        </div>
    );
}
