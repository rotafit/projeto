import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types/auth'
import { api } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  trialDaysLeft: number
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  selectedPlan?: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      trialDaysLeft: 0,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await api.post('/auth/login', { email, password })
          const { user, token } = response.data.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            trialDaysLeft: user.trialDaysLeft || 0
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true })
        try {
          const response = await api.post('/auth/register', data)
          const { user, token, trialDaysLeft } = response.data.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            trialDaysLeft
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          trialDaysLeft: 0
        })
      },

      checkAuth: async () => {
        const { token } = get()
        if (!token) return

        set({ isLoading: true })
        try {
          const response = await api.get('/auth/verify')
          const { user } = response.data.data
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            trialDaysLeft: user.trialDaysLeft || 0
          })
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            trialDaysLeft: 0,
            isLoading: false
          })
        }
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, ...userData }
          })
        }
      }
    }),
    {
      name: 'rotafit-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        trialDaysLeft: state.trialDaysLeft
      }),
    }
  )
)