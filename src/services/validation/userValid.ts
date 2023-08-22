import { body } from 'express-validator'

export const validUsernameExistsAndLength = body('username')
  .exists()
  .withMessage('ユーザー名を入力してください')
  .isLength({ min: 8 })
  .withMessage('ユーザー名は8文字以上入力してください')

export const validPasswordLength = body('password')
  .isLength({ min: 8 })
  .withMessage('パスワードは8文字以上入力してください')

export const validEmailExistsAndFormat = body('email')
  .exists()
  .withMessage('メールアドレスを入力してください')
  .isEmail()
  .withMessage('有効なメールアドレスを入力してください')
  .normalizeEmail()
