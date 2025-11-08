'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { Input } from './input'

interface AnimatedSearchProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e?: React.FormEvent) => void
  placeholder?: string
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
}

export function AnimatedSearch({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = 'Search anime...',
  className = ''
}: AnimatedSearchProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isFocused) {
      const interval = setInterval(() => {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: -10,
          size: Math.random() * 4 + 2,
          color: ['#6366f1', '#ec4899', '#8b5cf6', '#3b82f6'][Math.floor(Math.random() * 4)],
          duration: Math.random() * 2 + 2
        }
        setParticles(prev => [...prev.slice(-10), newParticle])
      }, 300)

      return () => clearInterval(interval)
    }
  }, [isFocused])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        animate={{
          boxShadow: isFocused 
            ? '0 0 40px rgba(99, 102, 241, 0.3)' 
            : '0 0 0px rgba(99, 102, 241, 0)'
        }}
        className='relative rounded-lg overflow-hidden'
      >
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10' />
        
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='absolute right-3 top-1/2 -translate-y-1/2 z-10'
          >
            <Sparkles className='h-4 w-4 text-primary animate-pulse' />
          </motion.div>
        )}

        <Input
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          className='pl-10 pr-10 h-10 transition-all duration-300 border-2'
          style={{
            borderColor: isFocused ? 'rgba(99, 102, 241, 0.5)' : undefined
          }}
        />

        {/* Particle effects */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: `${particle.x}%`, 
                y: particle.y,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                y: 60,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: particle.duration,
                ease: 'easeOut'
              }}
              className='absolute pointer-events-none'
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                borderRadius: '50%',
                filter: 'blur(1px)'
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

