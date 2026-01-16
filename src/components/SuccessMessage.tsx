import styles from './SuccessMessage.module.css';

interface SuccessMessageProps {
  message: string;
}

function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className={styles.successMessage} role="status">
      <span className={styles.successIcon}>✓</span>
      <span className={styles.successText}>{message}</span>
    </div>
  );
}

export default SuccessMessage;
