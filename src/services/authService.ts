import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { generateIdenticon } from '../utils/generateIdenticon'

const prisma = new PrismaClient()

// ユーザー新規登録API
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body

    const foundUser = await prisma.user.findUnique({ where: { email } })
    if (foundUser)
      return res
        .status(409)
        .json({ msg: 'メールアドレスはすでに登録されています' })

    const defaultIconImage = generateIdenticon(username)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profile: {
          create: {
            bio: 'はじめまして',
            profileImgUrl: defaultIconImage,
          },
        },
      },
    })

    const token = jwt.sign(
      { id: user.id },
      process.env.TOKEN_SECRET_KEY as string,
      { expiresIn: '24h' },
    )

    return res.status(201).json({ user, token })
  } catch (err) {
    return res.status(500).json(err)
  }
}

// ユーザーログインAPI
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return res.status(401).json({ msg: 'ユーザーが存在しません' })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return res.status(401).json({ msg: 'そのパスワードは間違っています' })

    const token = jwt.sign(
      { id: user.id },
      process.env.TOKEN_SECRET_KEY as string,
      { expiresIn: '24h' },
    )

    return res.status(201).json({ token })
  } catch (err) {
    return res.status(500).json(err)
  }
}

// ログインユーザー取得API
export const getLoginUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } })

    if (!user)
      return res.status(404).json({ msg: 'ユーザーが見つかりませんでした' })

    return res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
    })
  } catch (err) {
    return res.status(500).json(err)
  }
}
