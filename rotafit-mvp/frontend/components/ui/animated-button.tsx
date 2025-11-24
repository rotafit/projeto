'use client'

import { motion, MotionProps } from 'framer-motion'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isLoading?: boolean
  className?: string
  motionProps?: MotionProps
}

const buttonVariants = {
  default: {
    scale: 1,
    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.25)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 6px 20px 0 rgba(0, 118, 255, 0.35)',
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    boxShadow: '0 2px 8px 0 rgba(0, 118, 255, 0.2)',
    transition: { duration: 0.1 }
  }
}

const primaryButtonVariants = {
  default: {
    scale: 1,
    backgroundColor: '#3b82f6',
    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
  },
  hover: {
    scale: 1.02,
    backgroundColor: '#2563eb',
    boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    backgroundColor: '#1d4ed8',
    boxShadow: '0 2px 8px 0 rgba(59, 130, 246, 0.3)',
    transition: { duration: 0.1 }
  }
}

export function AnimatedButton({
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  className,
  motionProps,
  ...props
}: AnimatedButtonProps) {
  const isPrimary = variant === 'default'
  const buttonVariantsToUse = isPrimary ? primaryButtonVariants : buttonVariants

  return (
    <motion.div
      variants={buttonVariantsToUse}
      initial="default"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="inline-block"
      {...motionProps}
    >
      <Button
        variant={variant}
        size={size}
        disabled={isLoading || props.disabled}
        className={cn(
          'relative overflow-hidden',
          isPrimary && 'text-white border-0',
          isLoading && 'cursor-not-allowed opacity-70',
          className
        )}
        {...props}
      >
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: '100%' }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          />
        )}
        <motion.span
          animate={{ opacity: isLoading ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </Button>
    </motion.div>
  )
}