/**
 * Main Application Component
 */

import React from 'react';
import { Calculator, ErrorBoundary } from './components';

function App() {
  return (
    <div className="App">
      <ErrorBoundary onError={(error, errorInfo) => console.error('Calculator error:', error, errorInfo)}>
        <Calculator id="main-calculator" />
      </ErrorBoundary>
    </div>
  );
}

export default App;
