'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
}

const colorClasses = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  white: 'text-white'
}

export function AnimatedSpinner({ 
  size = 'md', 
  color = 'primary', 
  className 
}: AnimatedSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn(
          'border-2 border-current border-t-transparent rounded-full',
          sizeClasses[size],
          colorClasses[color]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

// Pulse loader for skeleton states
export function PulseLoader({ 
  color = 'primary',
  className 
}: { 
  color?: 'primary' | 'secondary' | 'white'
  className?: string 
}) {
  const colorClassesPulse = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-400',
    white: 'bg-white'
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            'w-2 h-2 rounded-full',
            colorClassesPulse[color]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )
}

// Loading overlay component
export function LoadingOverlay({ 
  message = 'Carregando...',
  className 
}: { 
  message?: string
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center',
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 text-center"
      >
        <AnimatedSpinner size="lg" color="primary" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-600 font-medium"
        >
          {message}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}