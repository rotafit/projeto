"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    // Create subscriptions/plans
    const plans = [
        {
            name: 'Essencial',
            price: 19.90,
            duration: 30,
            features: {
                plan: 'Essencial',
                price: 'R$ 19,90/mês',
                features: [
                    'Acesso ao App Rota Fit',
                    'Biblioteca de E-books e Receitas',
                    'Cardápios Prontos (7 dias)',
                    '+100 Receitas (Café, Almoço, Jantar, Ceia)',
                    'Receitas Low Carb, Termogênicas e Sobremesas Saudáveis',
                    'Planner Semanal Interativo (No App)',
                    'Guia Emagrecendo com Marmitas',
                    'Receitas Detox',
                    'Lista de Compras Automática',
                    'Quiz de Personalização',
                    'Cardápio Personalizado por IA',
                    'Acompanhamento de Progresso'
                ],
                limitations: [
                    'Sem acesso à IA personalizada avançado',
                    'Sem acompanhamento avançado premium'
                ]
            }
        },
        {
            name: 'Avançado',
            price: 34.90,
            duration: 30,
            features: {
                plan: 'Avançado',
                price: 'R$ 34,90/mês',
                features: [
                    'Todos os benefícios do Plano Essencial',
                    'Mais funcionalidades premium',
                    'Suporte prioritário',
                    'Relatórios avançados de progresso'
                ],
                isPopular: true
            }
        },
        {
            name: 'Premium IA',
            price: 59.90,
            duration: 30,
            features: {
                plan: 'Premium IA',
                price: 'R$ 59,90/mês',
                features: [
                    'Todos os benefícios dos planos anteriores',
                    'Acesso ao App Rota Fit',
                    'Quiz de Personalização Completo',
                    'Cardápio Personalizado 100% por IA',
                    'Acompanhamento de Progresso Avançado',
                    'Kit Turbo de Emagrecimento',
                    'Suporte VIP',
                    'Funcionalidades exclusivas'
                ],
                isPremium: true,
                savings: 'R$ 480/ano (pagamento anual)'
            }
        }
    ];
    console.log('📦 Creating subscription plans...');
    for (const plan of plans) {
        const existingPlan = await prisma.subscription.findUnique({
            where: { name: plan.name }
        });
        if (!existingPlan) {
            await prisma.subscription.create({
                data: plan
            });
            console.log(`✅ Created plan: ${plan.name}`);
        }
        else {
            console.log(`⏭️  Plan already exists: ${plan.name}`);
        }
    }
    console.log('🎉 Database seed completed successfully!');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error('❌ Error during seed:', e);
    await prisma.$disconnect();
    process.exit(1);
});
