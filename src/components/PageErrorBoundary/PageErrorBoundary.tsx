import React from 'react';

interface PageErrorBoundaryState {
  hasError: boolean;
}

class PageErrorBoundary extends React.Component<{}, PageErrorBoundaryState> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: any) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.renderError();
    }

    return this.props.children;
  }

  renderError() {
    const handleClick = () => window.location.reload();

    return (
      <div>
        Error loading page. <button onClick={handleClick}>Reload</button>
      </div>
    );
  }
}

export default PageErrorBoundary;
