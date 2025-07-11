/**
 * Main Application Component
 */

import React from 'react';
import { Calculator, ErrorBoundary } from './components';

function App() {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // In production, this could be sent to error reporting service
    // For now, we'll just track the error without console logging
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Calculator error:', error, errorInfo);
    }
  };

  return (
    <div className="App">
      <ErrorBoundary onError={handleError}>
        <Calculator id="main-calculator" />
      </ErrorBoundary>
    </div>
  );
}

export default App;
