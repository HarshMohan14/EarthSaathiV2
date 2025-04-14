// src/components/ErrorBoundary.jsx
import { useRouteError } from 'react-router';

export default function ErrorB() {
  const error = useRouteError();
  
  return (
    <div className="p-4 bg-red-100 text-red-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
      {error.status && (
        <p className="mb-2">
          <strong>Status:</strong> {error.status} {error.statusText}
        </p>
      )}
      <p className="font-mono">{error.message || error.data}</p>
    </div>
  );
}
