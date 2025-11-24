#!/bin/bash

echo "🚀 Configurando o RotaFit+ MVP..."
echo "=================================="

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale o Node.js 18+ primeiro."
    exit 1
fi

echo "✅ Node.js $(node --version) encontrado"

echo ""
echo "📦 Instalando dependências do backend..."
cd backend
npm install

echo ""
echo "📦 Instalando dependências do frontend..."
cd ../frontend
npm install

echo ""
echo "🔧 Configurando ambiente..."
cd ../backend

# Verificar se os arquivos de ambiente já existem
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado. Os arquivos de ambiente já foram criados automaticamente."
else
    echo "✅ Arquivo .env encontrado"
fi

cd ../frontend

if [ ! -f .env.local ]; then
    echo "⚠️  Arquivo .env.local não encontrado. Os arquivos de ambiente já foram criados automaticamente."
else
    echo "✅ Arquivo .env.local encontrado"
fi

cd ..

echo ""
echo "🗄️  Configurando banco de dados SQLite..."
cd backend

# Executar migrações do Prisma
echo "🔄 Executando migrações do Prisma..."
npm run db:generate
npm run db:migrate

# Executar seed
echo "🌱 Executando seed para popular planos de assinatura..."
npm run seed

cd ..

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "🎯 Para iniciar o projeto:"
echo "1. Terminal 1: cd backend && npm run dev"
echo "2. Terminal 2: cd frontend && npm run dev"
echo ""
echo "🌐 Acesse:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001/api"
echo ""
echo "📖 Consulte o README.md para mais informações"