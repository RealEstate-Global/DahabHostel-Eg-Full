"use client";

import { motion } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { NetworkErrorProps } from '@/app/_types';

export function NetworkError({ 
  onRetry, 
  message = "Unable to connect to the server. Please check your internet connection." 
}: NetworkErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        animate={{ 
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-destructive-soft rounded-full flex items-center justify-center">
          <WifiOff className="w-12 h-12 text-destructive" />
        </div>
      </motion.div>

      <h3 className="text-2xl font-bold text-ink-heading mb-3 font-display">
        Connection Lost
      </h3>
      
      <p className="text-ink-muted mb-6 text-center max-w-md">
        {message}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-brand hover:bg-brand-dark text-white shadow-soft"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Connection
        </Button>
      )}
    </motion.div>
  );
}
