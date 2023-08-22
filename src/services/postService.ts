import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 新規投稿API
export const post = async (req: express.Request, res: express.Response) => {
  try {
    const { content } = req.body

    const newPost = await prisma.post.create({
      data: {
        content,
        userId: req.userId as string,
      },
    })

    return res.status(201).json(newPost)
  } catch (err) {
    return res.status(500).json(err)
  }
}

// 最新投稿取得API
export const getPosts = async (res: express.Response) => {
  try {
    const posts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    })

    return res.status(200).json(posts)
  } catch (err) {
    return res.status(500).json(err)
  }
}
