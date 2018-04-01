import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/auth/local',
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
