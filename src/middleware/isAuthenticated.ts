import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ msg: '権限がありません。' })

  jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, (err, decoded) => {
    if (err) return res.status(401).json({ msg: '権限がありません。' })

    req.userId = (decoded as any).id

    next()
  })
}
