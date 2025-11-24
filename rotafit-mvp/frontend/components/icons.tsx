import React from 'react'

interface LockIconProps {
  className?: string
}

export function LockIcon({ className = 'w-4 h-4' }: LockIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  )
}

interface CheckIconProps {
  className?: string
}

export function CheckIcon({ className = 'w-4 h-4' }: CheckIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

interface CrownIconProps {
  className?: string
}

export function CrownIcon({ className = 'w-4 h-4' }: CrownIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 8l4 4 4-4m6 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}