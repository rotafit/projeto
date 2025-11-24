'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { AnimatedButton } from '@/components/ui/animated-button'
import { AnimatedCard } from '@/components/ui/animated-card'
import { AnimatedInput } from '@/components/ui/animated-input'
import { AnimatedSpinner, PulseLoader } from '@/components/ui/animated-spinner'
import { Badge } from '@/components/ui/badge'
import { LockIcon, CheckIcon, CrownIcon } from '@/components/icons'
import { showSuccessToast, showErrorToast, showLoadingToast } from '@/components/ui/custom-toasts'
import { cn } from '@/lib/utils'

// Dados dos planos baseados na landing page
const plans = [
  {
    id: 'ESSENCIAL',
    name: 'Essencial',
    price: 19.90,
    period: '/mês',
    description: 'Perfeito para começar',
    badge: null,
    features: [
      { name: 'Acesso a receitas básicas', available: true },
      { name: 'Planejamento de refeições simples', available: true },
      { name: 'Lista de compras automática', available: false },
      { name: 'IA Nutricional Rota Fit™', available: false },
      { name: 'Acompanhamento de progresso', available: false },
      { name: 'Chat com nutricionista', available: false }
    ]
  },
  {
    id: 'AVANCADO',
    name: 'Avançado',
    price: 34.90,
    period: '/mês',
    description: 'Mais vendido',
    badge: 'Mais Vendido',
    features: [
      { name: 'Acesso a receitas básicas', available: true },
      { name: 'Planejamento de refeições simples', available: true },
      { name: 'Lista de compras automática', available: true },
      { name: 'IA Nutricional Rota Fit™', available: false },
      { name: 'Acompanhamento de progresso', available: true },
      { name: 'Chat com nutricionista', available: false }
    ]
  },
  {
    id: 'PREMIUM_IA',
    name: 'Premium IA',
    price: 59.90,
    period: '/mês',
    description: 'Mais completo',
    badge: 'Mais Completo',
    features: [
      { name: 'Acesso a receitas básicas', available: true },
      { name: 'Planejamento de refeições simples', available: true },
      { name: 'Lista de compras automática', available: true },
      { name: 'IA Nutricional Rota Fit™', available: true },
      { name: 'Acompanhamento de progresso', available: true },
      { name: 'Chat com nutricionista', available: true }
    ]
  }
]

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('AVANCADO')
  const [isLoading, setIsLoading] = useState(false)
  
  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  const { login, register } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const loadingToast = showLoadingToast(
      isLogin ? 'Verificando suas credenciais...' : 'Criando sua conta...',
      'Aguarde um momento'
    )

    try {
      if (isLogin) {
        await login(email, password)
        
        // Dismiss loading toast
        import('react-hot-toast').then(({ toast }) => toast.dismiss(loadingToast))
        
        showSuccessToast(
          'Login realizado com sucesso! Redirecionando...',
          '🎉 Bem-vindo de volta!'
        )
        
        router.push('/dashboard')
      } else {
        await register({
          email,
          password,
          firstName,
          lastName,
          selectedPlan
        })
        
        // Dismiss loading toast
        import('react-hot-toast').then(({ toast }) => toast.dismiss(loadingToast))
        
        showSuccessToast(
          'Conta criada com sucesso! Você tem 7 dias gratuitos para testar todas as funcionalidades.',
          '🚀 Conta criada!'
        )
        
        router.push('/dashboard')
      }
    } catch (error) {
      // Dismiss loading toast
      import('react-hot-toast').then(({ toast }) => toast.dismiss(loadingToast))
      
      showErrorToast(
        error instanceof Error ? error.message : 'Erro ao processar solicitação. Tente novamente.',
        '❌ Ops! Algo deu errado'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex items-center justify-center">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              RotaFit+
            </motion.h1>
            <motion.p 
              className="text-gray-600 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              IA Nutricional Rota Fit™
            </motion.p>
          </motion.div>
        </div>
      </motion.header>

      {/* Trial Offer Banner */}
      <motion.div 
        className="container mx-auto px-4 mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Animated background elements */}
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
          
          <div className="relative z-10">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <CheckIcon className="w-6 h-6" />
              </motion.div>
              <span className="font-black text-2xl tracking-wider">7 DIAS GRÁTIS</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CrownIcon className="w-6 h-6" />
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-white/90 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Experimente qualquer plano sem compromisso. Cancele a qualquer momento.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Plans Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Escolha seu plano
            </motion.h2>
            
            <div className="grid gap-6">
              <AnimatePresence mode="wait">
                {plans.map((plan, index) => {
                  const isFeatured = plan.id === selectedPlan
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ 
                        delay: 0.5 + index * 0.1, 
                        duration: 0.6,
                        ease: 'easeOut'
                      }}
                    >
                      <AnimatedCard
                        variant={isFeatured ? 'featured' : 'default'}
                        className={cn(
                          'cursor-pointer transition-all duration-300',
                          isFeatured && 'ring-4 ring-blue-500/50 shadow-2xl'
                        )}
                        isHoverable
                        delay={index * 0.1}
                        whileHover={{ 
                          y: -8,
                          transition: { type: 'spring', stiffness: 300, damping: 30 }
                        }}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        <div className="p-8">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex-1">
                              <motion.div 
                                className="flex items-center gap-3 mb-2"
                                whileHover={{ scale: 1.02 }}
                              >
                                <h3 className="text-2xl font-bold text-gray-900">
                                  {plan.name}
                                </h3>
                                {plan.badge && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.8, type: 'spring', stiffness: 400 }}
                                  >
                                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xs px-3 py-1">
                                      {plan.badge}
                                    </Badge>
                                  </motion.div>
                                )}
                              </motion.div>
                              <p className="text-gray-600 text-lg font-medium">
                                {plan.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <motion.div 
                                className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                              >
                                R$ {plan.price.toFixed(2).replace('.', ',')}
                              </motion.div>
                              <div className="text-gray-500 font-medium">{plan.period}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            {plan.features.map((feature, featureIndex) => (
                              <motion.div 
                                key={featureIndex}
                                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: 0.7 + index * 0.1 + featureIndex * 0.05,
                                  duration: 0.4
                                }}
                                whileHover={{ x: 4 }}
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ 
                                    delay: 0.8 + index * 0.1 + featureIndex * 0.05,
                                    type: 'spring',
                                    stiffness: 400
                                  }}
                                >
                                  {feature.available ? (
                                    <motion.div
                                      whileHover={{ scale: 1.2, rotate: 360 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <CheckIcon className="w-5 h-5 text-green-500" />
                                    </motion.div>
                                  ) : (
                                    <motion.div
                                      whileHover={{ scale: 1.2 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <LockIcon className="w-5 h-5 text-gray-400" />
                                    </motion.div>
                                  )}
                                </motion.div>
                                <span className={cn(
                                  'text-base font-medium',
                                  feature.available ? 'text-gray-900' : 'text-gray-400'
                                )}>
                                  {feature.name}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                          
                          <AnimatePresence>
                            {isFeatured && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6"
                              >
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 text-center">
                                  <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  >
                                    <p className="text-blue-800 font-bold text-lg">
                                      ✅ Plano selecionado - 7 dias grátis incluso
                                    </p>
                                  </motion.div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </AnimatedCard>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <AnimatedCard variant="default" className="shadow-2xl overflow-hidden">
              <motion.div 
                className="text-center p-8 pb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-3"
                  whileHover={{ scale: 1.02 }}
                >
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </motion.h2>
                <motion.p 
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {isLogin 
                    ? 'Acesse sua conta para continuar' 
                    : 'Comece sua jornada nutricional hoje'
                  }
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="px-8 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div 
                        className="grid grid-cols-2 gap-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AnimatedInput
                          label="Nome"
                          placeholder="Seu nome"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          isValid={firstName.length > 0}
                        />
                        <AnimatedInput
                          label="Sobrenome"
                          placeholder="Seu sobrenome"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          isValid={lastName.length > 0}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isLogin ? 0.8 : 0.9, duration: 0.5 }}
                  >
                    <AnimatedInput
                      label="E-mail"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isValid={email.length > 0 && email.includes('@')}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isLogin ? 0.9 : 1.0, duration: 0.5 }}
                  >
                    <AnimatedInput
                      label="Senha"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isValid={password.length >= 6}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6"
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="text-blue-800 font-medium text-center">
                            📝 <strong>Plano selecionado:</strong> {plans.find(p => p.id === selectedPlan)?.name} 
                            <br />
                            <span className="text-sm opacity-80">
                              Você terá 7 dias gratuitos para testar todas as funcionalidades!
                            </span>
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isLogin ? 1.0 : 1.1, duration: 0.6 }}
                  >
                    <AnimatedButton 
                      type="submit" 
                      className="w-full h-12 text-lg font-bold" 
                      variant="default"
                      disabled={isLoading}
                      isLoading={isLoading}
                      motionProps={{
                        whileHover: { scale: 1.02 },
                        whileTap: { scale: 0.98 }
                      }}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <AnimatedSpinner size="sm" color="white" />
                          Processando...
                        </div>
                      ) : isLogin ? 'Entrar' : 'Começar 7 dias grátis'
                    }
                    </AnimatedButton>
                  </motion.div>
                </form>
              </motion.div>
              
              <motion.div 
                className="flex flex-col space-y-6 px-8 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="text-center text-gray-600">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <motion.button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-blue-600 hover:text-blue-500 font-bold underline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLogin ? 'Criar conta' : 'Fazer login'}
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {isLogin && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-sm text-gray-500"
                    >
                      Ao entrar, você concorda com nossos{' '}
                      <motion.a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-500 underline font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        Termos de Uso
                      </motion.a>{' '}
                      e{' '}
                      <motion.a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-500 underline font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        Política de Privacidade
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedCard>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm border-t border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { value: '+12.000', label: 'Usuários Ativos', icon: '👥' },
              { value: '4.9/5', label: 'Avaliação', icon: '⭐' },
              { value: '98%', label: 'Satisfação', icon: '🎯' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all"
              >
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <motion.div 
                  className="text-gray-600 font-semibold text-lg mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}