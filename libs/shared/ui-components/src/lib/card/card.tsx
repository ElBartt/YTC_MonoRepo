import { Button } from '../button/button';

export interface CardProps {
  readonly btnText: string | null;
  readonly cardTitle: string;
  readonly imgUrl: string;
  readonly subTitle: string;
  readonly onClick: () => void;
}

export function Card({ btnText, cardTitle, imgUrl, subTitle, onClick }: CardProps) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={imgUrl} alt="ytc-thumbnail" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cardTitle}</h2>
        <p>{subTitle}</p>
        <div className="card-actions justify-end">
          <Button onClick={() => onClick()} buttonType="btn-primary">
            {btnText ?? ''}
          </Button>
        </div>
      </div>
    </div>
  );
}
