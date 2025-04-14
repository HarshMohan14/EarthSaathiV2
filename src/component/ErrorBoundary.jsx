import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
    console.error("Error caught:", error, errorInfo);
    setHasError(true);
  };

  // React does not have a direct hook for catching errors like `componentDidCatch`.
  // Instead, you can use the `onError` prop in child components or external libraries.
  if (hasError) {
    return <div className="text-red-500">Hover component failed to load</div>;
  }

  return (
    <React.Fragment>
      {/* Wrap children with error handling */}
      {children}
    </React.Fragment>
  );
};

export default ErrorBoundary;
