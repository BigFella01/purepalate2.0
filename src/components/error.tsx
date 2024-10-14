interface ErrorMessageProps {
  errorMessage: string;
}

export default function Error({ errorMessage }: ErrorMessageProps) {
  return (
    <div>
      <p>{errorMessage}</p>
    </div>
  );
}
