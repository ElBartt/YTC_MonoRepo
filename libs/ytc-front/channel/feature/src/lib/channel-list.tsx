import { ChannelType, LABEL_STATS_LABELS, StatisticsType } from '@ytc/shared/models/util';
import { CardCentered } from '@ytc/shared/ui-components';
import { ROUTES } from '@ytc/shared/ytc-front/routes/util';
import { getChannelList } from '@ytc/ytc-front/channel/data-access';
import { getStatistics } from '@ytc/ytc-front/shared/statistics/data-access';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

export interface ChannelWithStatsType extends ChannelType {
    stats: StatisticsType;
}

export function ChannelList(): JSX.Element {
    const { t } = useTranslation();
    const navigate: NavigateFunction = useNavigate();

    const { user, apiKey } = useLocation().state;

    const [channelListValue, setChannelListValue] = useState<ChannelWithStatsType[]>([]);

    const handleChannelClick = (channelId: string) => {
        navigate(`/videos/${channelId}`, { state: { apiKey } });
    };

    const aggregatesChannelAndStats = (userId: number, apiKey: string): Observable<ChannelWithStatsType[]> => {
        return getChannelList(userId, apiKey).pipe(
            mergeMap((channelList: ChannelType[]) =>
                forkJoin(
                    channelList.map(channel =>
                        getStatistics(channel.id, ROUTES.pChannelId, apiKey).pipe(
                            map((statistics: StatisticsType) => {
                                return { ...channel, stats: statistics };
                            }),
                        ),
                    ),
                ),
            ),
        );
    };

    useEffect(() => {
        user.id &&
            aggregatesChannelAndStats(user.id, apiKey).subscribe((channelList: ChannelWithStatsType[]) => {
                setChannelListValue(channelList);
            });
    }, [user.id, apiKey, navigate]);

    return (
        <div className="flex justify-center self-center mx-auto">
            <div className="grid sm:grid-cols-1 gap-x-16 md:grid-cols-2 xl:grid-cols-3 drop-shadow-2xl">
                {channelListValue.map((channel: ChannelWithStatsType) => {
                    return (
                        <CardCentered
                            key={channel.id}
                            cardTitle={channel.name}
                            imgUrl={channel.thumbnail}
                            btnText={t('channel.btnCardChannel')}
                            onClick={() => handleChannelClick(channel.id)}
                        >
                            {Object.entries(channel.stats).map(([key, value]) => (
                                <p key={key}>
                                    {t(LABEL_STATS_LABELS[key as keyof StatisticsType])} : {value}
                                </p>
                            ))}
                        </CardCentered>
                    );
                })}
            </div>
        </div>
    );
}
