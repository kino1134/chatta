import { Router } from 'express'

import mongoose from 'mongoose'
import users from './users'
import rooms from './rooms'
import messages from './messages'

mongoose.connect('mongodb://localhost:27017', {
  user: 'admin',
  pass: 'pass1!',
  dbName: 'chatta'
})

const router = Router()

// Add Routes
router.use(users)
router.use(rooms)
router.use(messages)

export default router
