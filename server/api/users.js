import { Router } from 'express'
import User from '../models/User'
import { validate, notBlank } from '../utils/validate'

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

router.post('/users',
  ...validate([
    notBlank('e_mail').isEmail().withMessage('メールアドレスの形式で入力してください。'),
    notBlank('user_id').matches(/^[a-z0-9_.-]+$/i).withMessage('使用できない文字が含まれています。').custom((value) => {
      return User.findOne({ user_id: value }).then(user => {
        if (user) { throw new Error('exists User') }
      })
    }).withMessage('すでに使われているIDです。'),
    notBlank('password').isLength({ min: 8 }).withMessage('最低8文字入力してください。').isAscii().withMessage('使用できない文字が含まれています').matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).+$/).withMessage('複雑さが足りません。'),
    notBlank('confirm_password').custom((value, { req }) => {
      return value === req.body.password
    }).withMessage('パスワードが一致しません。')
  ]),
  function(req, res, next) {
    console.log(req.body)
    const param = Object.assign({}, req.body)
    param.user_name = param.user_name || param.user_id
    const user = new User(param)
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
