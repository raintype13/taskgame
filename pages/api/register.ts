import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import prisma from '../../lib/prisma'

const REFERRAL_BONUS = Number(process.env.REFERRAL_BONUS ?? 100)

function hashTelegramId(tgId: string | number) {
  return crypto.createHash('sha256').update(String(tgId)).digest('hex')
}

async function generateUniqueReferralCode() {
  while (true) {
    const code = Math.random().toString(36).slice(2, 9).toUpperCase()
    const exists = await prisma.user.findUnique({ where: { referralCode: code } })
    if (!exists) return code
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { tgId, username, firstName, ref } = req.body

    if (!tgId) return res.status(400).json({ error: 'tgId is required' })

    const telegramHash = hashTelegramId(tgId)

    // проверим, есть ли такой юзер
    let user = await prisma.user.findUnique({
      where: { telegramHash: telegramHash }, // 👈 строго по схеме
    })
    if (user) return res.status(200).json({ user, created: false })

    // новый юзер
    const safeUsername = username && username !== '' ? username : '<unknown>'
    const safeFirstName = firstName && firstName !== '' ? firstName : '<unknown>'
    const referralCode = await generateUniqueReferralCode()

    const inviter = ref ? await prisma.user.findUnique({ where: { referralCode: ref } }) : null

    // транзакция
    const createdUser = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          telegramHash,
          telegramUsername: safeUsername,
          firstName: safeFirstName,
          referralCode,
          referredBy: inviter ? inviter.referralCode : null,
        },
      })

      if (inviter) {
        await tx.user.update({
          where: { id: inviter.id },
          data: { points: { increment: REFERRAL_BONUS } },
        })
      }

      return created
    })

    return res.status(201).json({ user: createdUser, created: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'internal_error', detail: String(e) })
  }
}
