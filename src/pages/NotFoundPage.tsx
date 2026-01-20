import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import styles from '../styles/NotFoundPage.module.css';

const NotFoundPage = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const primaryPath = isAuthenticated ? '/' : '/login';
  const primaryLabel = isAuthenticated ? 'Back to Home' : 'Go to Login';

  return (
    <div className={styles['not-found-page']}>
      <div className={styles.card}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.message}>
          The page you are looking for doesn’t exist or has been moved. Let’s get you back on track.
        </p>
        <div className={styles.actions}>
          <Link to={primaryPath} className={`${styles.button} ${styles.primary}`}>
            {primaryLabel}
          </Link>
          <Link to="/shopping-lists" className={`${styles.button} ${styles.secondary}`}>
            Shopping Lists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
