"use client";

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { ErrorBoundaryProps, ErrorBoundaryState } from '@/app/_types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-destructive-soft rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
            
            <h3 className="text-2xl font-bold text-ink-heading mb-3 font-display">
              Something went wrong
            </h3>
            
            <p className="text-ink-muted mb-6">
              We encountered an error loading this section. Please try again.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-destructive-soft/50 border border-destructive/20 rounded-xl text-left">
                <p className="text-sm font-mono text-destructive">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <Button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="bg-brand hover:bg-brand-dark text-white shadow-soft"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
