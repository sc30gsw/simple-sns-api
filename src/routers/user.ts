import express from 'express'
import { getProfileAll, getUserProfile } from '../services/userService'

const router = express.Router()

router.get(
  '/profile/getAllProfiles',
  (req: express.Request, res: express.Response) => {
    getProfileAll(res)
  },
)

router.get(
  '/profile/:userId',
  (req: express.Request, res: express.Response) => {
    getUserProfile(req, res)
  },
)

export default router
