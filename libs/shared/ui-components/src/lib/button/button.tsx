export interface ButtonProps {
  readonly children: string;
  readonly buttonType?: 'btn-primary' | 'btn-secondary' | 'btn-neutral' | 'btn-accent' | 'btn-ghost' | 'btn-link';
  readonly onClick?: () => void;
}

export function Button({children, buttonType}: ButtonProps) {
  return (
    <button className={`btn ${buttonType}`}>{ children }</button>
  );
}

export default Button;
