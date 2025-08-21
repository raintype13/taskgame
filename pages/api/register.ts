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
      user = await prisma.user.create({
        data: {
          telegramId,
          telegramUsername: telegramUsername || null,
          firstName: firstName || null,
          lastName: lastName || null,
          points: 0,
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
          referredBy: ref || null, // Directly set referredBy from the request body
        },
      });

      // Handle referral logic
      if (ref) {
        const inviter = await prisma.user.findUnique({
          where: { referralCode: ref },
        });

        if (inviter) {
          // You need a way to store referrals. The current schema doesn't have a `referrals` field.
          // You could add a `referralCount` field or create a separate table for referrals.
          // Here's an example of how you would increment a count:
          await prisma.user.update({
            where: { referralCode: ref },
            data: {
              points: {
                increment: 50, // Add bonus points
              },
            },
          });

          // Give a bonus to the new user as well
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
    }

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  } finally {
    await prisma.$disconnect();
  }
}