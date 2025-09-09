// pages/api/auth.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  const { telegramUsername, firstName } = req.body;

  try {

    let user = await prisma.user.findUnique({
      where: { telegramUsername },
    });

    if (!user) {

      console.log('Пользователь не найден, создаю новую запись...');
      user = await prisma.user.create({
        data: {
          telegramUsername,
          firstName: firstName || null,
          points: 0, 
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        },
      });
      console.log('Новый пользователь создан.');
    } else {
      console.log('Пользователь уже существует, возвращаю его данные.');
    }

    
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так при регистрации' });
  } finally {

    await prisma.$disconnect();
  }
}