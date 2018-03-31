import { Router } from 'express'
import Message from '../models/Message.js'

const router = Router()

/* GET users listing. */
router.get('/messages', function (req, res, next) {
  Message.find({}, (err, messages) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(messages)
    }
  })
})

/* GET users listing. */
router.get('/messages/:room_id', function (req, res, next) {
  Message.find({ room_id: req.params.room_id }, (err, messages) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(messages)
    }
  })
})

router.post('/messages', function(req, res, next) {
  let message = new Message(Object.assign({
    posted: new Date(),
    user_id: req.user.user_id,
    user_name: req.user.user_name
  }, req.body))

  message.save((err, obj) => {
    if (err) {
      res.senStatus(500)
    } else {
      req.io.emit('posted', obj)
      res.json(obj)
    }
  })
})


export default router
