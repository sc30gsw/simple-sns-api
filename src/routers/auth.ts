import express from 'express'
import {
  validEmailExistsAndFormat,
  validPasswordLength,
  validUsernameExistsAndLength,
} from '../services/validation/userValid'
import { printErrors } from '../services/validation/validation'
import { getLoginUser, login, register } from '../services/authService'
import { isAuthenticated } from '../middleware/isAuthenticated'

const router = express.Router()

// 新規ユーザー登録API
router.post(
  '/register',
  validUsernameExistsAndLength,
  validEmailExistsAndFormat,
  validPasswordLength,
  printErrors,
  (req: express.Request, res: express.Response) => {
    register(req, res)
  },
)

// ユーザーログインAPI
router.post(
  '/login',
  validEmailExistsAndFormat,
  validPasswordLength,
  printErrors,
  (req: express.Request, res: express.Response) => {
    login(req, res)
  },
)

router.get(
  '/find',
  isAuthenticated,
  (req: express.Request, res: express.Response) => {
    getLoginUser(req, res)
  },
)

export default router
