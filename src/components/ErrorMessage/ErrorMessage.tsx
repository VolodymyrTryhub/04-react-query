import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={styles.text}>{message}</p>;
}

export default ErrorMessage;
