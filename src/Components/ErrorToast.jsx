const ErrorToast = ({ error }) => {
  if (!error) return null;

  return (
    <div className="toast toast-top toast-center z-50">
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ErrorToast;
