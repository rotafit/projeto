'use client'

import { motion } from 'framer-motion'
import { Input } from './input'
import { Label } from './label'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
  error?: string
  isValid?: boolean
  className?: string
}

export function AnimatedInput({
  label,
  icon,
  error,
  isValid,
  className,
  id,
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <motion.div
          animate={{
            y: isFocused || props.value ? -8 : 0,
            scale: isFocused || props.value ? 0.85 : 1
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              isFocused ? 'text-blue-600' : 'text-gray-700',
              error && 'text-red-500'
            )}
          >
            {label}
          </Label>
        </motion.div>
      )}
      
      <div className="relative">
        {icon && (
          <motion.div
            animate={{
              scale: isFocused ? 1.1 : 1,
              color: isFocused ? '#3b82f6' : '#6b7280'
            }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
          >
            {icon}
          </motion.div>
        )}
        
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused 
              ? '0 0 0 3px rgba(59, 130, 246, 0.1)' 
              : '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Input
            id={inputId}
            className={cn(
              'transition-all duration-200',
              icon && 'pl-10',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
              isValid && 'border-green-300 focus:border-green-500 focus:ring-green-500',
              isFocused && !error && !isValid && 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
            )}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
          
          {/* Focus border animation */}
          <motion.div
            className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 1.1
            }}
            transition={{ duration: 0.2 }}
            style={{ borderRadius: 'inherit' }}
          />
        </motion.div>
        
        {/* Validation checkmark */}
        {isValid && !error && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-red-600 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </p>
        </motion.div>
      )}
    </div>
  )
}

// Animated textarea
export function AnimatedTextarea({
  label,
  error,
  isValid,
  className,
  id,
  ...props
}: Omit<AnimatedInputProps, 'onFocus' | 'onBlur'> & { 
  rows?: number
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}) {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <motion.div
          animate={{
            y: isFocused || props.value ? -8 : 0,
            scale: isFocused || props.value ? 0.85 : 1
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              isFocused ? 'text-blue-600' : 'text-gray-700',
              error && 'text-red-500'
            )}
          >
            {label}
          </Label>
        </motion.div>
      )}
      
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? '0 0 0 3px rgba(59, 130, 246, 0.1)' 
            : '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <textarea
          id={inputId}
          className={cn(
            'w-full px-3 py-2 border border-gray-300 rounded-lg resize-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200 min-h-[80px]',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
            isValid && 'border-green-300 focus:border-green-500 focus:ring-green-500',
            isFocused && !error && !isValid && 'border-blue-300 focus:border-blue-500 focus:ring-blue-500',
            className
          )}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          value={props.value as string}
          onChange={props.onChange as any}
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.disabled}
          rows={props.rows || 4}
        />
      </motion.div>
      
      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-red-600 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </p>
        </motion.div>
      )}
    </div>
  )
}