"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { ReactNode } from 'react';
import { EmptyStateProps } from '@/app/_types';

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  children 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="relative">
          <div className="w-24 h-24 bg-brand-soft rounded-full flex items-center justify-center shadow-soft">
            <Icon className="w-12 h-12 text-brand" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-brand/20 rounded-full blur-xl"
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center max-w-md"
      >
        <h3 className="text-2xl font-bold text-ink-heading mb-3 font-display">
          {title}
        </h3>
        <p className="text-ink-muted mb-6">
          {description}
        </p>

        {action && (
          <Button
            onClick={action.onClick}
            className="bg-brand hover:bg-brand-dark text-white shadow-soft"
          >
            {action.label}
          </Button>
        )}

        {children}
      </motion.div>
    </motion.div>
  );
}
