import { Router } from 'express'
import passport from 'passport'
import { check } from 'express-validator/check'
import { validate, notBlank } from '../utils/validate'

const router = Router()

router.post('/auth/local',
  ...validate([notBlank('user_id'), notBlank('password')]),
  passport.authenticate('local', {  }),
  function(req, res, next) {
    req.session.save((err) => {
      if (err) {
        return res.sendStatus(500)
      } else {
        res.json(req.user)
      }
    })
})

router.post('/logout', function(req, res, next) {
  req.logout()
  res.sendStatus(200)
})


export default router
