import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // создаём тестового пользователя
  const user = await prisma.user.create({
    data: {
      telegramHash: '123',
      telegramUsername: 'rain_test',
      firstName: 'Rain',
      points: 100,
      referralCode: 'REF123',
      referredBy: null,
      tonWalletAddress: 'EQC1234567890',
    },
  })

  console.log('✅ Created user:', user)

  // читаем всех пользователей
  const users = await prisma.user.findMany()
  console.log('📊 All users:', users)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
