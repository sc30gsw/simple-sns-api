import express from 'express'
import 'dotenv/config'
import authRouter from './routers/auth'
import postRouter from './routers/posts'
import userRouter from './routers/user'
import cors from 'cors'

const app = express()

const PORT = 4000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`)
})
