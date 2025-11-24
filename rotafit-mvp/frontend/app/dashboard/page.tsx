'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { AnimatedCard } from '@/components/ui/animated-card'
import { AnimatedButton } from '@/components/ui/animated-button'
import { Badge } from '@/components/ui/badge'
import { LockIcon, CheckIcon } from '@/components/icons'
import { PageTransition, StaggerContainer, StaggerChild } from '@/components/ui/page-transition'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const { user, logout, trialDaysLeft } = useAuthStore()

  if (!user) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p 
            className="text-gray-600 text-lg font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Carregando dashboard...
          </motion.p>
        </div>
      </motion.div>
    )
  }

  const features = [
    {
      name: 'Receitas',
      available: true,
      description: 'Acesso a +300 receitas personalizadas'
    },
    {
      name: 'IA Nutricional',
      available: user.subscription?.name === 'PREMIUM_IA' || false,
      description: 'Planos alimentares gerados por IA',
      requires: 'Premium IA'
    },
    {
      name: 'Lista de Compras',
      available: user.subscription?.name !== 'ESSENCIAL' || false,
      description: 'Listas automáticas por plano alimentar',
      requires: 'Avançado ou Premium'
    },
    {
      name: 'Progresso',
      available: user.subscription?.name !== 'ESSENCIAL' || false,
      description: 'Acompanhamento de peso e medidas',
      requires: 'Avançado ou Premium'
    },
    {
      name: 'Chat Nutricionista',
      available: user.subscription?.name === 'PREMIUM_IA' || false,
      description: 'Atendimento personalizado 24/7',
      requires: 'Premium IA'
    }
  ]

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h1 
                className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                RotaFit+
              </motion.h1>
              <motion.p 
                className="text-gray-600 font-medium text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Bem-vindo, {user.firstName}! 👋
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <AnimatedButton 
                onClick={logout} 
                variant="outline"
                motionProps={{
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 }
                }}
              >
                🚪 Sair
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-12">
        {/* Trial Status */}
        {trialDaysLeft > 0 && !user.subscription && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            <AnimatedCard variant="featured" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                animate={{
                  x: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Badge className="bg-white text-blue-600 font-bold text-lg px-4 py-2">
                      🎉 TRIAL ATIVO
                    </Badge>
                  </motion.div>
                </div>
                <motion.h3 
                  className="text-3xl font-black mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Você está no período gratuito!
                </motion.h3>
                <motion.p 
                  className="text-white/90 text-lg font-medium mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Aproveite para testar todas as funcionalidades do RotaFit+ por mais {trialDaysLeft} dias.
                </motion.p>
                <AnimatedButton 
                  variant="secondary" 
                  size="lg"
                  motionProps={{
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.8, duration: 0.5 },
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 }
                  }}
                >
                  🚀 Fazer Upgrade Agora
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </motion.div>
        )}

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <AnimatedCard variant="default" className="overflow-hidden">
            <motion.div 
              className="p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900"
                  whileHover={{ scale: 1.02 }}
                >
                  💳 Seu Plano Atual: {user.subscription?.name || 'Carregando...'}
                </motion.h2>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 400 }}
                >
                  <Badge 
                    variant={trialDaysLeft > 0 && !user.subscription ? 'secondary' : 'default'}
                    className={trialDaysLeft > 0 && !user.subscription ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                  >
                    {trialDaysLeft > 0 && !user.subscription ? '🔄 Trial' : '✅ Ativo'}
                  </Badge>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    label: 'Preço', 
                    value: `R$ ${user.subscription?.price?.toFixed(2).replace('.', ',') || '...'}`, 
                    suffix: '/mês',
                    icon: '💰',
                    delay: 0.7 
                  },
                  { 
                    label: 'Status', 
                    value: trialDaysLeft > 0 && !user.subscription 
                      ? `Trial ativo - ${trialDaysLeft} dias restantes` 
                      : user.subscription ? 'Assinatura ativa' : 'Trial ativo',
                    icon: trialDaysLeft > 0 && !user.subscription ? '⏰' : '✅',
                    delay: 0.8 
                  },
                  { 
                    label: 'Próxima Cobrança', 
                    value: trialDaysLeft > 0 && !user.subscription 
                      ? 'Após o trial' 
                      : user.subscription ? 'Em 30 dias' : 'Após o trial',
                    icon: '📅',
                    delay: 0.9 
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.delay, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100"
                  >
                    <motion.div 
                      className="text-3xl mb-2"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-gray-900 leading-tight">
                      {item.value}
                      {item.suffix && <span className="text-sm text-gray-500 ml-1">{item.suffix}</span>}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatedCard>
        </motion.div>

        {/* Features Grid */}
        <StaggerContainer className="mb-12" delay={0.6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              ✨ Suas Funcionalidades
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <StaggerChild key={index}>
                <AnimatedCard 
                  variant={feature.available ? 'default' : 'compact'}
                  isHoverable={feature.available}
                  whileHover={feature.available ? { 
                    y: -8,
                    transition: { type: 'spring', stiffness: 300, damping: 30 }
                  } : undefined}
                  className={cn(
                    'relative overflow-hidden',
                    !feature.available && 'opacity-75'
                  )}
                >
                  <motion.div className="p-6">
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      whileHover={feature.available ? { scale: 1.05 } : {}}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.8 + index * 0.1, 
                          type: 'spring', 
                          stiffness: 400 
                        }}
                      >
                        {feature.available ? (
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckIcon className="w-6 h-6 text-green-500" />
                          </motion.div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <LockIcon className="w-6 h-6 text-gray-400" />
                          </motion.div>
                        )}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-gray-900">
                        {feature.name}
                      </h3>
                    </motion.div>
                    
                    {!feature.available && feature.requires && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="mb-4"
                      >
                        <Badge variant="outline" className="text-sm border-orange-300 text-orange-700 bg-orange-50">
                          🔒 Requer: {feature.requires}
                        </Badge>
                      </motion.div>
                    )}
                    
                    <motion.p 
                      className="text-gray-600 text-base mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      {feature.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                    >
                      {feature.available ? (
                        <AnimatedButton 
                          size="lg" 
                          className="w-full font-bold"
                          motionProps={{
                            whileHover: { scale: 1.02 },
                            whileTap: { scale: 0.98 }
                          }}
                        >
                          🚀 Acessar
                        </AnimatedButton>
                      ) : (
                        <AnimatedButton 
                          size="lg" 
                          variant="outline" 
                          className="w-full"
                          disabled
                          motionProps={{
                            whileHover: { scale: 1.02 }
                          }}
                        >
                          <LockIcon className="w-5 h-5 mr-2" />
                          Fazer Upgrade
                        </AnimatedButton>
                      )}
                    </motion.div>
                  </motion.div>
                  
                  {/* Locked overlay */}
                  {!feature.available && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="text-center p-6">
                        <motion.div
                          animate={{ 
                            y: [0, -5, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        >
                          <LockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        </motion.div>
                        <p className="text-gray-600 font-medium text-lg">
                          🔒 Disponível no seu plano
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatedCard>
              </StaggerChild>
            ))}
          </div>
        </StaggerContainer>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <AnimatedCard variant="default" className="overflow-hidden">
            <motion.div 
              className="p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <motion.h2 
                className="text-2xl font-bold text-gray-900 mb-8 text-center"
                whileHover={{ scale: 1.02 }}
              >
                ⚡ Ações Rápidas
              </motion.h2>
              
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" delay={0.2}>
                {[
                  { icon: '📚', label: 'Receitas', delay: 1.4 },
                  { icon: '🍽️', label: 'Planner', delay: 1.5 },
                  { icon: '📊', label: 'Progresso', delay: 1.6 },
                  { icon: '🛒', label: 'Compras', delay: 1.7 }
                ].map((action, index) => (
                  <StaggerChild key={index}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.05, 
                        y: -4,
                        transition: { type: 'spring', stiffness: 400 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatedButton 
                        variant="outline" 
                        className="h-auto p-6 flex flex-col items-center gap-4 w-full bg-gradient-to-br from-white to-gray-50 border-2 hover:border-blue-300"
                        size="lg"
                      >
                        <motion.div
                          className="text-4xl"
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        >
                          {action.icon}
                        </motion.div>
                        <span className="font-bold text-gray-800 text-lg">
                          {action.label}
                        </span>
                      </AnimatedButton>
                    </motion.div>
                  </StaggerChild>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatedCard>
        </motion.div>
      </div>
    </PageTransition>
  )
}