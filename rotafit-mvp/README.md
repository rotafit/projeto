# RotaFit+ MVP - IA Nutricional Personalizada

O primeiro app brasileiro com **IA Nutricional Rota Fit™** para criar planos alimentares personalizados sem esforço.

## 🚀 Características

- **IA Personalizada**: Algoritmo que aprende com seus objetivos, preferências, restrições e rotina
- **Planos de Assinatura**: 3 níveis (Essencial, Avançado, Premium IA)
- **Trial Gratuito**: 7 dias de acesso completo
- **317+ Receitas**: Categorizadas por tipo, dificuldade e calorias
- **Tracker de Progresso**: Acompanhamento em tempo real
- **Lista de Compras Automática**: Geração baseada nos seus cardápios

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** + **Prisma ORM**
- **JWT** para autenticação
- **Rate limiting** e segurança

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Query** para estado do servidor
- **Zustand** para estado global
- **React Hook Form** + **Zod** para validação

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## ⚡ Instalação e Execução

### 1. Clone e Configure

```bash
# Clone o repositório
git clone <repository-url>
cd rotafit-mvp

# Instale as dependências
npm install
```

### 2. Configure o Backend

```bash
cd backend

# Copie e configure o arquivo .env
cp .env.example .env

# Edite o .env com suas configurações:
# - DATABASE_URL (PostgreSQL)
# - JWT_SECRET
# - OPENAI_API_KEY (opcional, para IA)
# - STRIPE_SECRET_KEY (para pagamentos)

# Execute as migrações do banco
npm run db:migrate

# Popule o banco com dados iniciais
npm run seed

# Inicie o servidor backend
npm run dev
```

### 3. Configure o Frontend

```bash
cd frontend

# Copie e configure o arquivo .env.local
cp .env.local.example .env.local

# Configure a URL da API
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Inicie o servidor frontend
npm run dev
```

### 4. Acesse a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **users**: Usuários do sistema
- **subscriptions**: Planos de assinatura  
- **quiz_responses**: Respostas do quiz de personalização
- **meal_plans**: Planos alimentares gerados
- **recipes**: Base de 317 receitas
- **progress_entries**: Entradas de progresso
- **shopping_lists**: Listas de compras

## 📊 Funcionalidades por Plano

### Essencial (R$ 19,90/mês)
- ✅ Biblioteca de receitas (+100)
- ✅ Cardápios prontos (7 dias)
- ✅ Planner básico
- ✅ Tracker de progresso
- ❌ IA personalizada avançada

### Avançado (R$ 34,90/mês) - **Mais Vendido**
- ✅ Todos os recursos do Essencial
- ✅ Planner interativo
- ✅ Receitas Low Carb e Termogênicas
- ✅ Lista de compras automática
- ✅ Relatórios avançados

### Premium IA (R$ 59,90/mês) - **Mais Completo**
- ✅ Todos os recursos anteriores
- ✅ IA nutricional 100% personalizada
- ✅ Quiz de personalização completo
- ✅ Kit Turbo de Emagrecimento
- ✅ Suporte VIP

## 🔐 Sistema de Autenticação

- **JWT** com expiração de 7 dias
- **Trial gratuito** de 7 dias para todos os usuários
- **Renovação automática** de tokens
- **Proteção de rotas** por nível de assinatura

## 📱 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login  
- `GET /api/auth/verify` - Verificar token

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

### Receitas
- `GET /api/recipes` - Listar receitas (com filtros)
- `GET /api/recipes/:id` - Detalhes da receita
- `POST /api/recipes/sync` - Sincronizar com JSON

### Planos Alimentares
- `GET /api/meal-plans` - Planos do usuário
- `POST /api/meal-plans` - Gerar novo plano
- `PUT /api/meal-plans/:id` - Atualizar plano

### Quiz e Personalização
- `POST /api/quiz/submit` - Enviar respostas
- `GET /api/quiz/personalize` - Gerar recomendações

## 🎯 Próximos Passos

1. **✅ Concluído**: Estrutura básica backend + frontend
2. **🔄 Em Desenvolvimento**: Interface de usuário
3. **📅 Próximo**: Sistema de pagamentos (Stripe)
4. **📅 Futuro**: Integração com IA (OpenAI)
5. **📱 Futuro**: App mobile (React Native)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**MiniMax Agent** - Desenvolvimento completo do MVP

---

### 🌟 **RotaFit+** - Transformando vidas através da nutrição personalizada! 🌟