import { CommentType, StatisticsType } from '@ytc/shared/models/util';
import { ROUTES } from '@ytc/shared/ytc-front/routes/util';
import { CommentList } from '@ytc/ytc-front/shared/comment/feature';
import { getStatistics } from '@ytc/ytc-front/shared/statistics/data-access';
import { Statistics } from '@ytc/ytc-front/shared/statistics/feature';
import { getCommentList } from '@ytc/ytc-front/video/video-details/data-access';

import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export function YtcFrontVideoVideoDetailsFeature() {
    const { id } = useParams();
    const { video, apiKey } = useLocation().state;
    const [commentList, setCommentList] = useState<CommentType[]>([]);
    const [stats, setStats] = useState<StatisticsType>({});

    useEffect(() => {
        if (id) {
            getCommentList(id, apiKey).subscribe((comList: CommentType[]) => {
                setCommentList(comList);
            });
            getStatistics(id, ROUTES.pVideoId, apiKey).subscribe((stats: StatisticsType) => {
                setStats(stats);
            });
        }
    }, [apiKey, id]);

    /*
  TODO : All the page for the video details (comments, video, stats)
  */
    return (
        <>
            <div className="flex justify-center mx-auto mb-28">
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
            <Statistics statistics={stats}></Statistics>
            <CommentList comments={commentList}></CommentList>
        </>
    );
}
