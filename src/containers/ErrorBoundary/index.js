import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import * as Sentry from '@sentry/browser';

export class ErrorBoundry extends Component {
  state = {
    eventId: null
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  showReportDialog = () => {
    Sentry.showReportDialog({ eventId: this.state.eventId });
  };

  render() {
    if (this.state.hasError) {
      // render fallback UI

      if (this.props.fallbackUI) {
        return this.props.fallbackUI(this.showReportDialog);
      }

      return (
        <div>
          <h1>Header</h1>
          <button onClick={this.showReportDialog}>
            Report feedback
          </button>
          <a href="/">Back</a>
        </div>
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

ErrorBoundry.propTypes = {
  fallbackUI: PropTypes.func
};

export default injectIntl(ErrorBoundry);
