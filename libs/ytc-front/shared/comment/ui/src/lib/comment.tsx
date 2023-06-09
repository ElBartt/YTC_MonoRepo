import { CommentType } from '@ytc/shared/models/util';
import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

export interface CommentProps {
  comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
  const { t } = useTranslation();

  return (
    <div className="card-body px-0 after:content-[''] after:h-[0.1rem] after:left-0 after:right-0 after:mx-auto after:w-1/3 after:bg-primary after:opacity-30">
      <h2 className="card-title" dangerouslySetInnerHTML={{ __html: comment.commenter }}></h2>
      <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
      <div className="flex items-center w-1/4">
        <p className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`${comment.like_count > 0 && 'fill-pink-400'} w-6 h-6`}
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span className={`${comment.like_count > 0 && 'text-pink-400'} ml-2`}>{comment.like_count}</span>
        </p>
        <p className="italic text-xs">
          {t('video-details.publishedDate')} {format(parseISO(comment.date), 'MM/dd/yyyy')}
        </p>
      </div>
    </div>
  );
}
