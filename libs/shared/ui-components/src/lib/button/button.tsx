import { ReactNode } from 'react';

export interface ButtonProps {
    readonly children: string | ReactNode;
    readonly buttonType?: 'btn-primary' | 'btn-secondary' | 'btn-neutral' | 'btn-accent' | 'btn-ghost' | 'btn-link';
    readonly customStyle?: string;
    readonly onClick: () => void;
}

export function Button({ children, buttonType, customStyle, onClick }: ButtonProps) {
    return (
        <button onClick={() => onClick()} className={`btn ${buttonType} ${customStyle}`}>
            {children}
        </button>
    );
}
