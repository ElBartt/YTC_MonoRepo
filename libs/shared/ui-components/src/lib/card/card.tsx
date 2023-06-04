import { Button } from '../button/button';

export interface CardProps {
  readonly btnText: string;
  readonly cardTitle: string;
  readonly imgUrl: string;
  readonly key: string | number;
  readonly subTitle: string;
  readonly onClick: () => void;
}

export function Card({ btnText, cardTitle, imgUrl, key, subTitle, onClick }: CardProps) {
  return (
    <div key={key} className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={imgUrl} alt="ytc-thumbnail" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cardTitle}</h2>
        <p>{subTitle}</p>
        <div className="card-actions justify-end">
          <Button onClick={() => onClick()} buttonType="btn-primary">
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  );
}
