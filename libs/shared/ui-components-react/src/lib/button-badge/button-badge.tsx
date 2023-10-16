import { Badge } from '../badge/badge';
import { Button } from '../button/button';

export interface ButtonBadgeProps {
    readonly children: string | number;
    readonly badgeLabel: string;
    readonly buttonType?: 'btn-primary' | 'btn-secondary' | 'btn-neutral' | 'btn-accent' | 'btn-ghost' | 'btn-link';
    readonly badgeType?:
        | 'badge-primary'
        | 'badge-secondary'
        | 'badge-neutral'
        | 'badge-accent'
        | 'badge-ghost'
        | 'badge-default';
    readonly customStyleButton?: string;
    readonly customStyleBadge?: string;
    readonly onClick: () => void;
}

export function ButtonBadge({
    children,
    badgeLabel,
    badgeType,
    buttonType,
    customStyleButton,
    customStyleBadge,
    onClick,
}: ButtonBadgeProps) {
    return (
        <Button onClick={() => onClick()} buttonType={buttonType} customStyle={customStyleButton}>
            <Badge customStyle={customStyleBadge} badgeType={badgeType}>
                {badgeLabel}
            </Badge>
            {children}
        </Button>
    );
}
