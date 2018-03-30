import { Router } from 'express'

import users from './users'
import rooms from './rooms'
import messages from './messages'

const router = Router()

// Add Routes
router.use(users)
router.use(rooms)
router.use(messages)

export default router
