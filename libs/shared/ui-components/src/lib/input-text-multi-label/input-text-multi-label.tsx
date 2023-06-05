export interface InputTextMultiLabelProps {
  readonly topLeftLabel?: string | null;
  readonly topRightLabel?: string | null;
  readonly bottomLeftLabel?: string | null;
  readonly bottomRightLabel?: string | null;
  readonly placeholder?: string | null;
  readonly styleInput?:
    | 'input-primary '
    | 'input-accent'
    | 'input-info'
    | 'input-success'
    | 'input-warning'
    | 'input-error';
  readonly sizeInput?: 'input-xs' | 'input-sm' | 'input-md' | 'input-lg';
  readonly isDisabled?: boolean;
}

export function InputTextMultiLabel({
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
  placeholder,
  styleInput,
  sizeInput,
  isDisabled = false,
}: InputTextMultiLabelProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{topLeftLabel || ''}</span>
        <span className="label-text-alt">{topRightLabel || ''}</span>
      </label>
      <input
        type="text"
        disabled={isDisabled}
        placeholder={placeholder || ''}
        className={`input input-bordered w-full max-w-xs ${sizeInput} ${styleInput}`}
      />
      <label className="label">
        <span className="label-text-alt">{bottomLeftLabel || ''}</span>
        <span className="label-text-alt">{bottomRightLabel || ''}</span>
      </label>
    </div>
  );
}
