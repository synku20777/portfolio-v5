import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400">Something went wrong</h2>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            We encountered an error loading this component. Try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Refresh
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;