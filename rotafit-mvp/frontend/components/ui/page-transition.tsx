'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
}

const childVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <motion.div
      className={className}
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div variants={childVariants}>
        {children}
      </motion.div>
    </motion.div>
  )
}

// Slide transition for specific use cases
export function SlideTransition({ 
  children, 
  direction = 'right',
  className 
}: {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  className?: string
}) {
  const pathname = usePathname()

  const slideVariants = {
    initial: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '-100%' : direction === 'down' ? '100%' : 0,
      opacity: 0
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: {
      x: direction === 'left' ? '100%' : direction === 'right' ? '-100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.55, 0.06, 0.68, 0.19]
      }
    }
  }

  return (
    <motion.div
      className={className}
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideVariants}
    >
      {children}
    </motion.div>
  )
}

// Fade transition for modals and overlays
export function FadeTransition({ 
  children, 
  isVisible,
  className 
}: {
  children: ReactNode
  isVisible: boolean
  className?: string
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scale transition for modals and popups
export function ScaleTransition({ 
  children, 
  isVisible,
  className 
}: {
  children: ReactNode
  isVisible: boolean
  className?: string
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.23, 1, 0.32, 1] 
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Stagger container for lists and grids
export function StaggerContainer({ 
  children, 
  className,
  delay = 0 
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger child for use with StaggerContainer
export function StaggerChild({ 
  children, 
  className 
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.4, 
            ease: 'easeOut' 
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}