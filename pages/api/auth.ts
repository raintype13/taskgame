// pages/api/auth.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  // Получаем данные пользователя из тела запроса
  const { telegramUsername, firstName } = req.body;

  try {
    // 1. Поиск пользователя по уникальному имени пользователя Telegram
    let user = await prisma.user.findUnique({
      where: { telegramUsername },
    });

    if (!user) {
      // 2. Если пользователь не найден, создаем новую запись
      console.log('Пользователь не найден, создаю новую запись...');
      user = await prisma.user.create({
        data: {
          telegramUsername,
          firstName: firstName || null,
          points: 0, // Устанавливаем начальный баланс 0
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        },
      });
      console.log('Новый пользователь создан.');
    } else {
      console.log('Пользователь уже существует, возвращаю его данные.');
    }

    // 3. Возвращаем данные пользователя (нового или существующего)
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так при регистрации' });
  } finally {
    // Важно: отключаем Prisma Client, чтобы избежать проблем
    await prisma.$disconnect();
  }
}