import { body } from 'express-validator'

export const validContentExistsAndLength = body('content')
  .exists()
  .withMessage('投稿内容がありません')
  .isLength({ min: 1 })
  .withMessage('投稿内容を入力してください')
