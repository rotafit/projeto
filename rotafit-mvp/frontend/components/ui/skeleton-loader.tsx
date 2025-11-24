'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Main skeleton component
export function Skeleton({
  className,
  variant = 'default',
  ...props
}: {
  className?: string
  variant?: 'default' | 'circle' | 'text' | 'avatar'
  [key: string]: any
}) {
  const variants = {
    default: 'animate-pulse bg-gray-200',
    circle: 'animate-pulse bg-gray-200 rounded-full',
    text: 'animate-pulse bg-gray-200 rounded',
    avatar: 'animate-pulse bg-gray-200 rounded-full w-12 h-12'
  }

  return (
    <motion.div
      className={cn(variants[variant], className)}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      {...props}
    />
  )
}

// Card skeleton
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn(
      'bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm',
      className
    )}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32 bg-gray-200 rounded" />
        <Skeleton className="h-5 w-20 bg-gray-200 rounded" />
      </div>
      <Skeleton className="h-4 w-24 bg-gray-200 rounded" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 bg-gray-200 rounded-full" />
            <Skeleton className="h-4 flex-1 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
  )
}

// Plan card skeleton (for auth page)
export function SkeletonPlanCard({ className }: { className?: string }) {
  return (
    <div className={cn(
      'bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-24 bg-gray-200 rounded" />
          <Skeleton className="h-5 w-32 bg-gray-200 rounded" />
        </div>
        <div className="text-right space-y-1">
          <Skeleton className="h-8 w-20 bg-gray-200 rounded" />
          <Skeleton className="h-4 w-12 bg-gray-200 rounded" />
        </div>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-5 w-5 bg-gray-200 rounded-full" />
            <Skeleton className="h-5 flex-1 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Feature card skeleton (for dashboard)
export function SkeletonFeatureCard({ className }: { className?: string }) {
  return (
    <div className={cn(
      'bg-white rounded-2xl border border-gray-200 p-6',
      className
    )}>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-6 w-6 bg-gray-200 rounded-full" />
        <Skeleton className="h-6 w-32 bg-gray-200 rounded" />
      </div>
      
      <Skeleton className="h-4 w-full bg-gray-200 rounded mb-2" />
      <Skeleton className="h-4 w-3/4 bg-gray-200 rounded mb-6" />
      
      <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
    </div>
  )
}

// Stats skeleton
export function SkeletonStat({ className }: { className?: string }) {
  return (
    <div className={cn(
      'bg-white rounded-xl p-6 text-center border border-gray-100',
      className
    )}>
      <Skeleton className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4" />
      <Skeleton className="h-8 w-16 bg-gray-200 rounded mx-auto mb-2" />
      <Skeleton className="h-4 w-24 bg-gray-200 rounded mx-auto" />
    </div>
  )
}

// Quick action skeleton
export function SkeletonQuickAction({ className }: { className?: string }) {
  return (
    <div className={cn(
      'bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center gap-3',
      className
    )}>
      <Skeleton className="w-12 h-12 bg-gray-200 rounded-full" />
      <Skeleton className="h-5 w-16 bg-gray-200 rounded" />
    </div>
  )
}

// Table skeleton
export function SkeletonTable({ 
  rows = 5, 
  columns = 4,
  className 
}: { 
  rows?: number
  columns?: number
  className?: string 
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-6 bg-gray-200 rounded" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-5 bg-gray-100 rounded" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Loading page layout
export function SkeletonPage({ className }: { className?: string }) {
  return (
    <div className={cn('min-h-screen space-y-8', className)}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32 bg-gray-200 rounded" />
            <Skeleton className="h-5 w-48 bg-gray-200 rounded" />
          </div>
          <Skeleton className="h-10 w-20 bg-gray-200 rounded-lg" />
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonStat key={i} />
          ))}
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonFeatureCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Pulse animation for loading states
export function PulseSkeleton({ 
  size = 'md',
  count = 3,
  className 
}: { 
  size?: 'sm' | 'md' | 'lg'
  count?: number
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'bg-gray-200 rounded-full',
            sizeClasses[size]
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