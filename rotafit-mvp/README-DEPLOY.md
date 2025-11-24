# 🚀 Guia Completo de Deploy - RotaFit+ MVP

## 📋 Pré-requisitos
- ✅ Conta no GitHub
- ✅ Conta no Render.com (gratuita)
- ✅ Projeto já preparado e funcionando localmente

## 🎯 Estratégia de Deploy (2 Etapas)

### **ETAPA 1: Deploy Backend (Node.js + Prisma + SQLite)**
### **ETAPA 2: Deploy Frontend (Next.js)**

---

## 🚀 ETAPA 1: DEPLOY DO BACKEND

### Passo 1: Criar Conta no Render
1. Acesse https://render.com
2. Clique em **"Get Started for Free"**
3. Faça login com sua conta GitHub

### Passo 2: Criar Web Service (Backend)
1. No dashboard do Render, clique em **"New +"**
2. Selecione **"Web Service"**
3. Escolha **"Build and deploy from a Git repository"**
4. Selecione seu repositório GitHub

### Passo 3: Configurar o Backend
**Configurações Básicas:**
- **Name**: `rotafit-mvp-backend`
- **Region**: `São Paulo (South America)` (mais próximo do Brasil)
- **Branch**: `main`
- **Root Directory**: `backend/`

**Configurações de Build e Deploy:**
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Passo 4: Configurar Variáveis de Ambiente
Na seção **"Environment"**, adicione as seguintes variáveis:

```
NODE_ENV=production
PORT=3001
JWT_SECRET=rotafit-mvp-2024-super-secret-key-production-mode-very-secure
FRONTEND_URL=https://your-frontend-url-on-render
DATABASE_URL=file:./rotafit.db
```

### Passo 5: Configurar Banco de Dados SQLite
1. Em **"Advanced"** → **"Storage"**
2. Clique em **"Create Disk"**
3. **Disk Name**: `rotafit-disk`
4. **Mount Path**: `/data`
5. **Size**: `1GB`
6. Clique em **"Create"**

7. Depois, modifique o DATABASE_URL para:
```
DATABASE_URL=file:/data/rotafit.db
```

### Passo 6: Deploy do Backend
1. Clique em **"Create Web Service"**
2. Aguarde o deploy (5-10 minutos)
3. Anote a URL do backend (ex: `https://rotafit-mvp-backend.onrender.com`)
4. Teste: `https://your-backend-url.onrender.com/api/health`

---

## 🌐 ETAPA 2: DEPLOY DO FRONTEND

### Passo 1: Atualizar URL da API
1. Vá para a pasta `frontend/`
2. Abra `lib/api.ts` 
3. Altere a `baseURL` para a URL do seu backend:

```typescript
// ANTES:
const baseURL = 'http://localhost:3001/api';

// DEPOIS (substitua pela sua URL do backend):
const baseURL = 'https://rotafit-mvp-backend.onrender.com/api';
```

### Passo 2: Commit e Push das Mudanças
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Passo 3: Criar Frontend no Render
1. No Render, clique em **"New +"** → **"Static Site"**
2. **Branch**: `main`
3. **Root Directory**: `frontend/`

### Passo 4: Configurar Build do Next.js
**Build Settings:**
- **Build Command**: `npm install && npm run build`
- **Static Publish Directory**: `.next`

**Environment Variables (se necessário):**
- `NEXT_PUBLIC_API_URL`: `https://rotafit-mvp-backend.onrender.com/api`

### Passo 5: Deploy do Frontend
1. Clique em **"Create Static Site"**
2. Aguarde o deploy (5-8 minutos)
3. Anote a URL do frontend: `https://rotafit-mvp-frontend.onrender.com`

---

## ⚙️ CONFIGURAÇÕES FINAIS

### Passo 1: Atualizar CORS do Backend
1. Vá para Render → Backend → Environment
2. Atualize `FRONTEND_URL` para a URL do seu frontend
3. Faça redeploy automático

### Passo 2: Configurar HTTPS e Domínio
- ✅ Render automaticamente configura HTTPS
- ✅ URLs personalizadas disponíveis na versão paga

### Passo 3: Teste Completo
1. Acesse: `https://your-frontend-url.onrender.com`
2. Teste registro e login
3. Verifique dashboard e funcionalidades
4. Teste em dispositivos móveis

---

## 🔧 SOLUÇÃO DE PROBLEMAS

### Erro: "Module not found"
**Solução**: Verifique se os `package.json` estão corretos e as dependências estão instaladas.

### Erro: "Database connection failed"
**Solução**: 
1. Verifique se o Disk foi criado corretamente
2. Confirme que DATABASE_URL aponta para `/data/rotafit.db`
3. Aguarde alguns minutos para o banco inicializar

### Erro: "CORS error"
**Solução**: 
1. Verifique se FRONTEND_URL está configurada no backend
2. Use a URL exata do frontend (com https://)

### Erro: "Build failed"
**Solução**:
1. Verifique os logs no Render
2. Certifique-se que o Build Command está correto
3. Confirme que todas as dependências estão no package.json

---

## 📱 TESTE FINAL

### Checklist de Funcionamento:
- [ ] Backend responde em `/api/health`
- [ ] Frontend carrega sem erros
- [ ] Registro de usuário funciona
- [ ] Login funciona
- [ ] Dashboard carrega com animações
- [ ] Recuperação de senha (se implementada)
- [ ] Todas as páginas carregam
- [ ] Design responsivo funciona

---

## 💰 CUSTOS (Render Free Tier)
- **Backend**: Grátis (desliga após 15 min inativo)
- **Frontend**: Grátis (desliga após 15 min inativo)
- **Bandwidth**: 100GB/mês
- **Tempo de build**: 10-15 min

**Para produção 24/7**: Upgrade para plano pago ($7/mês)

---

## 🎉 PRONTO!

Sua aplicação RotaFit+ estará disponível online em:
- **Frontend**: `https://your-app-name.onrender.com`
- **Backend**: `https://your-backend-name.onrender.com`

**Próximos passos opcionais:**
1. 🔑 Adicionar chaves do Google Gemini
2. 💳 Configurar Stripe para pagamentos
3. 📧 Configurar email transacional
4. 🌐 Configurar domínio personalizado

---

## 📞 Suporte

Se tiver dúvidas durante o deploy:
1. Verifique os logs do Render
2. Teste localmente primeiro
3. Confirme que todas as variáveis estão corretas
4. Aguarde alguns minutos após mudanças

**URLs de referência:**
- Render Dashboard: https://dashboard.render.com
- Documentação: https://render.com/docs
- Status da aplicação: https://status.render.com