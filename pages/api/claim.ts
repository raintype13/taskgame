import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { tgId, taskId, reward } = req.body
    if (!tgId || !taskId || !reward) {
      return res.status(400).json({ error: 'missing params' })
    }

    // Проверим, не клеймил ли уже
    const claimed = await prisma.taskClaim.findUnique({
      where: { userId_taskId: { userId: tgId, taskId } }
    })
    if (claimed) {
      return res.status(400).json({ error: 'already claimed' })
    }

    // Транзакция: +баланс +сохранить клейм
    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { telegramHash: tgId },
        data: { points: { increment: reward } },
      })

      await tx.taskClaim.create({
        data: { userId: tgId, taskId }
      })

      return user
    })

    res.json({ user: updatedUser })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'internal_error' })
  }
}
