import React from "react";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.error !== null) {
      return (
        <p className="text-red-600"> <ExclamationTriangleIcon className="inline-flex w-6 h-6" /> Something went wrong here!</p>
      )
    }

    return this.props.children;
  }
}
