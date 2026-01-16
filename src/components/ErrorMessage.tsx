import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles['error-message']} role="alert">
      <span className={styles['error-text']}>{message}</span>
    </div>
  );
}

export default ErrorMessage;
