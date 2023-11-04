import { LABEL_STATS_LABELS, StatisticsType } from '@ytc/shared/models/util';
import { ButtonBadge } from '@ytc/shared/ui-components';
import { useTranslation } from 'react-i18next';

export interface StatisticsProps {
    readonly statistics: StatisticsType;
    readonly filter: string;
    readonly setFilter: (filterName: string) => void;
}

export function Statistics({ statistics, filter, setFilter }: StatisticsProps) {
    const { t } = useTranslation();

    const formatValue = (value: number): string => {
        if (value >= 100) {
            return `99+`;
        }
        return `${value}`;
    };

    return (
        <div className="flex flex-row justify-between w-8/12">
            {Object.entries(statistics).map(([key, value]) => (
                <ButtonBadge
                    key={key}
                    customStyleBadge="badge-default"
                    customStyleButton="btn-primary"
                    badgeLabel={t(LABEL_STATS_LABELS[key as keyof StatisticsType])}
                    onClick={function (): void {
                        setFilter(key);
                    }}
                >
                    {formatValue(value)}
                </ButtonBadge>
            ))}
        </div>
    );
}
