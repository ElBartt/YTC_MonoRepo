import { LABEL_STATS_LABELS, StatisticsType } from '@ytc/shared/models/util';
import { ButtonBadge } from '@ytc/shared/ui-components-react';
import { useTranslation } from 'react-i18next';

export interface StatisticsProps {
    readonly statistics: StatisticsType;
}

export function Statistics({ statistics }: StatisticsProps) {
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
                        throw new Error('Function not implemented.');
                    }}
                >
                    {formatValue(value)}
                </ButtonBadge>
            ))}
        </div>
    );
}
