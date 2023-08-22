import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()

export const getProfileAll = async (res: express.Response) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: {
          include: {
            posts: true,
          },
        },
      },
    })

    return res.status(200).json(profiles)
  } catch (err) {
    return res.status(500).json
  }
}

export const getUserProfile = async (
  req: express.Request,
  res: express.Response,
) => {
  const { userId } = req.params

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
      include: {
        user: true,
      },
    })

    if (!profile)
      return res
        .status(404)
        .json({ msg: 'プロフィール情報が見つかりませんでした' })

    const posts = await prisma.post.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    })

    return res.status(200).json({ profile: profile, posts: posts })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}
