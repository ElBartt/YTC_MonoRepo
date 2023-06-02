export interface ButtonProps {
  readonly children: string;
  readonly buttonType?: 'btn-primary' | 'btn-secondary' | 'btn-neutral' | 'btn-accent' | 'btn-ghost' | 'btn-link';
  readonly onClick: () => void;
}

export function Button({ children, buttonType, onClick }: ButtonProps) {
  return (
    <button onClick={() => onClick()} className={`btn ${buttonType}`}>
      {children}
    </button>
  );
}
