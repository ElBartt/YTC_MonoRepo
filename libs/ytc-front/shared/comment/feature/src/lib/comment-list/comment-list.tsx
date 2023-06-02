import styles from './comment-list.module.css';

/* eslint-disable-next-line */
export interface CommentListProps {}

export function CommentList(props: CommentListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CommentList!</h1>
    </div>
  );
}
  