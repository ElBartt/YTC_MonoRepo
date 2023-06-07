import { Button } from '../button/button';

export interface CardCenteredProps {
  readonly btnText: string | null;
  readonly cardTitle: string;
  readonly imgUrl: string;
  readonly subTitle?: string;
  readonly onClick: () => void;
}

export function CardCentered({ btnText, imgUrl, cardTitle, subTitle, onClick }: CardCenteredProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl sm:mt-3">
      <figure className="px-10 pt-10">
        <img referrerPolicy="no-referrer" src={imgUrl} alt="" className="max-h-20 rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{cardTitle}!</h2>
        {subTitle && <p>subTitle</p>}
        <div className="card-actions">
          <Button onClick={() => onClick()} customStyle="btn-primary">
            {btnText ?? ''}
          </Button>
        </div>
      </div>
    </div>
  );
}
