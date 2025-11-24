# 🚀 Guia Completo para Executar o RotaFit+ MVP

## Pré-requisitos

- **Node.js 18+** (recomendado Node.js 20)
- **npm** (vem com Node.js)
- **Git** (opcional, para clonar o repositório)

## 📦 Instalação e Configuração

### 1. Fazer download dos arquivos
Se você já tem todos os arquivos do projeto em uma pasta, pule para o passo 2.

### 2. Executar o script de configuração automática
```bash
# Tornar o script executável (Linux/Mac)
chmod +x setup.sh

# Executar o script
bash setup.sh
```

**OU executar manualmente:**

### 3. Instalar dependências do Backend
```bash
cd backend
npm install
```

### 4. Instalar dependências do Frontend
```bash
cd ../frontend
npm install
```

### 5. Configurar banco de dados (SQLite para desenvolvimento)
```bash
cd ../backend

# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate

# Popular planos de assinatura
npm run seed
```

## 🎯 Executar o Projeto

### Opção 1: Scripts Automáticos
```bash
# Executar backend e frontend simultaneamente (em terminais separados)
bash setup.sh
# Depois execute em terminais separados:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

### Opção 2: Execução Manual

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend estará disponível em: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend estará disponível em: `http://localhost:3000`

## 🔧 Configuração de Arquivos de Ambiente

### Backend (.env)
O arquivo já foi criado automaticamente com as configurações:
- **Banco**: SQLite (arquivo local `rotafit.db`)
- **Porta**: 3001
- **CORS**: Permite requests de `http://localhost:3000`

### Frontend (.env.local)
O arquivo já foi criado automaticamente com as configurações:
- **API URL**: `http://localhost:3001/api`
- **Trial Days**: 7 dias grátis

## 📊 Estrutura do Banco de Dados

O SQLite criará automaticamente:
- **Tabela Users**: Usuários registrados
- **Tabela Subscriptions**: Planos de assinatura
- **Tabela QuizResponses**: Respostas do quiz de personalização
- **Tabela MealPlans**: Planos de refeições
- **Tabela Recipe**: Receitas (317 receitas carregadas)
- **Tabela ProgressEntry**: Acompanhamento de progresso
- **Tabela ShoppingList**: Listas de compras
- **Tabela Notification**: Notificações

## 🌱 Dados de Seed (Populados automaticamente)

### Planos de Assinatura:
1. **ESSENCIAL** - R$ 19,90/mês
   - Acesso básico às receitas
   - Planejamento de refeições simples

2. **AVANÇADO** - R$ 34,90/mês (Mais Vendido)
   - Todas as funcionalidades essenciais
   - Lista de compras automática
   - Acompanhamento de progresso

3. **PREMIUM IA** - R$ 59,90/mês (Mais Completo)
   - IA Nutricional Rota Fit™
   - Planos personalizados por IA
   - Todas as funcionalidades premium

## 🔍 Testar o Sistema

### 1. Criar Usuário (Teste)
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@rotafit.com",
    "password": "123456",
    "firstName": "Usuário",
    "lastName": "Teste"
  }'
```

### 2. Fazer Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@rotafit.com",
    "password": "123456"
  }'
```

### 3. Acessar Receitas
```bash
curl -X GET http://localhost:3001/api/recipes \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🚨 Solução de Problemas

### Problema: Erro ao conectar no banco
**Solução:** 
```bash
cd backend
npm run db:generate
npm run db:migrate
```

### Problema: Porta já em uso
**Solução:** 
- Backend: Mude a porta no `.env` (PORT=3002)
- Frontend: O Next.js automaticamente usará a próxima porta disponível

### Problema: Erro de dependências
**Solução:** 
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema: CORS errors
**Solução:** Verifique se o `FRONTEND_URL` no `.env` do backend está configurado para `http://localhost:3000`

## 📁 Estrutura de Arquivos

```
rotafit-mvp/
├── backend/
│   ├── src/
│   │   ├── routes/        # APIs (auth, recipes, users, etc)
│   │   ├── middleware/    # Auth, rate limiting, etc
│   │   ├── seeds/         # Dados iniciais
│   │   └── index.ts       # Servidor Express
│   ├── prisma/
│   │   ├── schema.prisma  # Schema do banco
│   │   └── rotafit.db     # Banco SQLite (criado automaticamente)
│   ├── .env               # Variáveis de ambiente
│   └── package.json
├── frontend/
│   ├── app/               # Páginas Next.js
│   ├── store/             # Zustand stores
│   ├── lib/               # API client
│   ├── types/             # TypeScript types
│   ├── .env.local         # Variáveis de ambiente
│   └── package.json
└── setup.sh               # Script de configuração
```

## ✅ Verificação de Funcionamento

Após executar o projeto, verifique:

1. ✅ Backend acessível em `http://localhost:3001/api/health`
2. ✅ Frontend acessível em `http://localhost:3000`
3. ✅ Banco de dados criado (arquivo `backend/rotafit.db`)
4. ✅ Planos de assinatura populados (3 planos)
5. ✅ 317 receitas carregadas

## 🎯 Próximos Passos

Agora que o ambiente está funcionando, vamos implementar:
1. **Tela de Login/Registro** com oferta de 7 dias grátis
2. **Dashboard** com planos visíveis e funcionalidade travada
3. **Integração com pagamento** (Stripe)
4. **IA nutricional** para personalização

---

**🚀 Divirta-se desenvolvendo o RotaFit+ MVP!**