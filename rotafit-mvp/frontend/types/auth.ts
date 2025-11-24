export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  birthDate?: string
  gender?: string
  weight?: number
  height?: number
  activityLevel?: string
  subscription?: Subscription
  trialDaysLeft?: number
  trialEndDate?: string
}

export interface Subscription {
  id: string
  name: string
  price: number
  duration: number
  features: SubscriptionFeatures
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SubscriptionFeatures {
  plan: string
  price: string
  features: string[]
  limitations?: string[]
  isPopular?: boolean
  isPremium?: boolean
  savings?: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  selectedPlan?: string
}

export interface QuizResponse {
  id: string
  userId: string
  objectives: string
  dietaryRestrictions: string[]
  foodPreferences: string[]
  allergies: string[]
  routineType: string
  cookingTime: string
  cookingSkill: string
  favoriteCategories: string[]
  responses: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface MealPlan {
  id: string
  userId: string
  weekStart: string
  weekEnd: string
  isPersonalized: boolean
  aiGenerated: boolean
  dailyPlans: DailyMealPlan[]
  totalCalories: number
  macroTargets: MacroTargets
  createdAt: string
  updatedAt: string
}

export interface DailyMealPlan {
  date: string
  meals: {
    breakfast?: Recipe
    lunch?: Recipe
    dinner?: Recipe
    snack?: Recipe
    supper?: Recipe
  }
  totalCalories: number
  macros: MacroTargets
}

export interface Recipe {
  id: string
  name: string
  category: string
  difficulty: string
  prepTime: string
  cookTime: string
  servings: number
  calories: number
  ingredients: Ingredient[]
  instructions: string[]
  tags: string[]
  nutrition: Nutrition
  healthBenefits: string[]
}

export interface Ingredient {
  item: string
  amount: string
  unit: string
}

export interface Nutrition {
  protein: number
  carbs: number
  fat: number
}

export interface MacroTargets {
  protein: number
  carbs: number
  fat: number
  calories: number
}

export interface ProgressEntry {
  id: string
  userId: string
  date: string
  weight?: number
  waterIntake?: number
  stepsCount?: number
  caloriesBurned?: number
  exerciseType?: string
  exerciseDuration?: number
  notes?: string
  createdAt: string
}

export interface ShoppingList {
  id: string
  userId: string
  name: string
  weekStart: string
  weekEnd: string
  items: ShoppingItem[]
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface ShoppingItem {
  id: string
  name: string
  amount: string
  unit: string
  category: string
  isChecked: boolean
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error'
  message: string
  data?: T
  error?: string
}