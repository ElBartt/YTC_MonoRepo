import { ChannelType } from '@ytc/shared/models/util';
import { CardCentered } from '@ytc/shared/ui-components';
import { getChannelList } from '@ytc/ytc-front/channel/data-access';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

export function ChannelList(): JSX.Element {
    const { t } = useTranslation();
    const navigate: NavigateFunction = useNavigate();

    const { user, apiKey } = useLocation().state;

    const [channelListValue, setChannelListValue] = useState<ChannelType[]>([]);

    const handleChannelClick = (channelId: string) => {
        navigate(`/videos/${channelId}`, { state: { apiKey } });
    };

    useEffect(() => {
        user.id &&
            getChannelList(user.id, apiKey).subscribe((channelList: ChannelType[]) => {
                setChannelListValue(channelList);
                if (channelList.length === 1) {
                    navigate(`/videos/${channelList[0].id}`, { state: { apiKey } });
                }
            });
    }, [user.id, apiKey, navigate]);

    return (
        <div className="flex justify-center self-center mx-auto">
            <div className="grid sm:grid-cols-1 gap-x-16 md:grid-cols-2 xl:grid-cols-3 drop-shadow-2xl">
                {channelListValue.map((channel: ChannelType) => {
                    return (
                        <CardCentered
                            key={channel.id}
                            cardTitle={channel.name}
                            imgUrl={channel.thumbnail}
                            btnText={t('channel.btnCardChannel')}
                            onClick={() => handleChannelClick(channel.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
