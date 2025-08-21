import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tgId } = req.query
    if (!tgId) return res.status(400).json({ error: 'tgId required' })

    const user = await prisma.user.findUnique({
      where: { telegramHash: String(tgId) },
    })

    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json(user)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'internal_error' })
  }
}
