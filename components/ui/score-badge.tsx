'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ScoreBadge({ score, size = 'md', className = '' }: ScoreBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'from-yellow-400 to-amber-500'
    if (score >= 8) return 'from-green-400 to-emerald-500'
    if (score >= 7) return 'from-blue-400 to-cyan-500'
    if (score >= 6) return 'from-purple-400 to-violet-500'
    return 'from-gray-400 to-gray-500'
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${getScoreColor(score)} text-white font-bold shadow-lg ${sizeClasses[size]} ${className}`}
    >
      <Star className={`fill-current ${starSizes[size]}`} />
      <span>{score.toFixed(1)}</span>
    </motion.div>
  )
}

