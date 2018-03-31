import { Router } from 'express'

import users from './users'
import rooms from './rooms'
import messages from './messages'
import auth from './auth'

const router = Router()

// Add Routes
router.use(users)
router.use(rooms)
router.use(messages)
router.use(auth)

export default router
