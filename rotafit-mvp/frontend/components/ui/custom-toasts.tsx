'use client'

import { toast as hotToast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface CustomToastProps {
  title?: string
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  icon?: ReactNode
  duration?: number
}

// Success toast with confetti effect
export const showSuccessToast = (message: string, title?: string) => {
  hotToast.success(
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 0.8 }}
        className="text-green-500"
      >
        🎉
      </motion.div>
      <div>
        {title && <div className="font-bold text-green-800">{title}</div>}
        <div className="text-green-700">{message}</div>
      </div>
    </motion.div>,
    {
      duration: 4000,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    }
  )
}

// Error toast with shake effect
export const showErrorToast = (message: string, title?: string) => {
  hotToast.error(
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 20 }}
      className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
    >
      <motion.div
        animate={{ 
          x: [0, -5, 5, -5, 5, 0],
        }}
        transition={{ duration: 0.5 }}
        className="text-red-500"
      >
        ⚠️
      </motion.div>
      <div>
        {title && <div className="font-bold text-red-800">{title}</div>}
        <div className="text-red-700">{message}</div>
      </div>
    </motion.div>,
    {
      duration: 5000,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    }
  )
}

// Info toast with pulse effect
export const showInfoToast = (message: string, title?: string) => {
  hotToast(
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-blue-500"
      >
        💡
      </motion.div>
      <div>
        {title && <div className="font-bold text-blue-800">{title}</div>}
        <div className="text-blue-700">{message}</div>
      </div>
    </motion.div>,
    {
      icon: 'ℹ️',
      duration: 4000,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    }
  )
}

// Warning toast with bounce effect
export const showWarningToast = (message: string, title?: string) => {
  hotToast(
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
    >
      <motion.div
        animate={{ 
          y: [0, -3, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-yellow-500"
      >
        ⚡
      </motion.div>
      <div>
        {title && <div className="font-bold text-yellow-800">{title}</div>}
        <div className="text-yellow-700">{message}</div>
      </div>
    </motion.div>,
    {
      duration: 4500,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    }
  )
}

// Loading toast with progress bar
export const showLoadingToast = (message: string, title?: string) => {
  return hotToast(
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
      />
      <div>
        {title && <div className="font-bold text-purple-800">{title}</div>}
        <div className="text-purple-700">{message}</div>
      </div>
    </motion.div>,
    {
      duration: Infinity,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    }
  )
}

// Custom toast for achievements
export const showAchievementToast = (achievement: string, description: string) => {
  hotToast(
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: [0, -10, 0]
      }}
      exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 20 
      }}
      className="flex items-center gap-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl shadow-xl"
    >
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity },
          scale: { duration: 1.5, repeat: Infinity }
        }}
        className="text-4xl"
      >
        🏆
      </motion.div>
      <div>
        <div className="font-black text-yellow-800 text-lg">{achievement}</div>
        <div className="text-yellow-700">{description}</div>
      </div>
    </motion.div>,
    {
      duration: 6000,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    }
  )
}

// Function to dismiss loading toast
export const dismissToast = (toastId: string) => {
  hotToast.dismiss(toastId)
}