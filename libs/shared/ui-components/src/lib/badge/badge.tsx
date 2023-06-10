export interface BadgeProps {
    readonly badgeType?:
        | 'badge-primary'
        | 'badge-secondary'
        | 'badge-neutral'
        | 'badge-accent'
        | 'badge-ghost'
        | 'badge-default';
    readonly customStyle?: string;
    readonly children: string;
}

export function Badge({ badgeType, customStyle, children }: BadgeProps) {
    return <div className={`badge ${badgeType} ${customStyle}`}>{children}</div>;
}
