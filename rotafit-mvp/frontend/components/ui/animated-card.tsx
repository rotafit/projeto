'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends MotionProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'featured' | 'compact'
  isHoverable?: boolean
  delay?: number
  onClick?: () => void
}

const cardVariants = {
  default: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  featured: {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },
  compact: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }
}

const hoverVariants = {
  default: {
    scale: 1,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2 }
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.2 }
  }
}

const featuredHoverVariants = {
  default: {
    scale: 1,
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)',
    borderColor: 'rgb(59, 130, 246)',
    transition: { duration: 0.2 }
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.25)',
    borderColor: 'rgb(37, 99, 235)',
    transition: { duration: 0.2 }
  }
}

export function AnimatedCard({
  children,
  className,
  variant = 'default',
  isHoverable = true,
  delay = 0,
  onClick,
  ...motionProps
}: AnimatedCardProps) {
  const cardVariantsToUse = cardVariants[variant]
  
  const getHoverVariants = () => {
    if (variant === 'featured') return featuredHoverVariants
    return hoverVariants
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariantsToUse}
      transition={{ 
        duration: 0.5, 
        ease: 'easeOut', 
        delay: delay 
      }}
      whileHover={isHoverable ? 'hover' : undefined}
      variants-hover={getHoverVariants()}
      className={cn(
        'relative bg-white rounded-2xl border border-gray-200 overflow-hidden',
        variant === 'featured' && 'border-2 border-blue-200 shadow-lg',
        isHoverable && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...motionProps}
    >
      {/* Animated background overlay for featured cards */}
      {variant === 'featured' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border effect */}
      {variant === 'featured' && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-400 rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}

// Skeleton card for loading states
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn(
      'bg-white rounded-2xl border border-gray-200 p-6 space-y-4 animate-pulse',
      className
    )}>
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-200 rounded w-3/5" />
      </div>
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  )
}