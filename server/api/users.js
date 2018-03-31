import { Router } from 'express'
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

router.get('/users/my', function (req, res, next) {
  res.json(req.user)
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

export default router
