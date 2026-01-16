import styles from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={styles.spinner} role="status">
      <div className={styles['spinner-circle']} />
      <span className={styles['spinner-text']}>Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
