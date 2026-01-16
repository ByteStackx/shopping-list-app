import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <span className="error-text">{message}</span>
    </div>
  );
}

export default ErrorMessage;
