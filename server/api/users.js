import { Router } from 'express'
import passport from 'passport'
import User from '../models/User'

const router = Router()

/* GET users listing. */
router.get('/users', function (req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(users)
    }
  })
})

/* GET user by ID. */
router.get('/users/:user_id', function (req, res, next) {
  User.find({ user_id: req.params.user_id }, (err, users) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(users)
    }
  })
})

router.post('/users', function(req, res, next) {
  console.log(req.body)
  const user = new User(Object.assign({}, req.body))
  user.save((err, obj) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.json(obj)
    }
  })
})

router.post('/auth/local',
  passport.authenticate('local', {  }),
  function(req, res, next) {
    req.session.save((err) => {
      if (err) {
        return res.sendStatus(500)
      } else {
        res.sendStatus(200)
      }
    })
})

export default router
