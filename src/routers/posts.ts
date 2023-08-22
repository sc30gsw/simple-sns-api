import express from 'express'
import { printErrors } from '../services/validation/validation'
import { validContentExistsAndLength } from '../services/validation/postsValid'
import { getPosts, post } from '../services/postService'
import { isAuthenticated } from '../middleware/isAuthenticated'

const router = express.Router()

// 新規投稿API
router.post(
  '/post',
  isAuthenticated,
  validContentExistsAndLength,

  printErrors,
  (req: express.Request, res: express.Response) => {
    post(req, res)
  },
)

router.get('/getPosts', (req: express.Request, res: express.Response) => {
  getPosts(res)
})

export default router
