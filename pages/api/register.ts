import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  const { telegramId, telegramUsername, firstName, lastName, ref } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      // Create a new user if one doesn't exist
      const newUser = await prisma.user.create({
        data: {
          telegramId,
          telegramUsername: telegramUsername || null,
          firstName: firstName || null,
          lastName: lastName || null,
          points: 0,
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          referredBy: ref || null,
        },
      });

      // Handle referral logic
      if (ref) {
        const inviter = await prisma.user.findUnique({
          where: { referralCode: ref },
        });

        if (inviter) {
          await prisma.user.update({
            where: { referralCode: ref },
            data: {
              points: {
                increment: 50,
              },
            },
          });
          
          await prisma.user.update({
            where: { telegramId },
            data: {
              points: {
                increment: 50,
              },
            },
          });
        }
      }
      res.status(200).json(newUser);
    } else {
      res.status(200).json(user);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  } finally {
    await prisma.$disconnect();
  }
}