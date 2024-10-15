import React from 'react'
import { Button } from '@/components/ui/button'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center h-full space-y-4">
    <h2 className="text-2xl font-bold text-destructive">Oops! Something went wrong.</h2>
    <p className="text-muted-foreground">{error.message}</p>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </div>
)

export default ErrorFallback
