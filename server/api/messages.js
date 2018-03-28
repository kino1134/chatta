import { Router } from 'express'
import Message from '../models/Message.js'

const router = Router()

const messages = [
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       '* <b>あいうえお</b>\nかきくけこ',
    posted:     new Date(),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
  {
    user_name:  'John Smith',
    user_id:    '@test_example',
    room_id:    '1',
    body:       'あいうえお',
    posted:     new Date(2017,0,15,22,30,21),
  },
]

/* GET users listing. */
router.get('/messages', function (req, res, next) {
  Message.find({}, (err, messages) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.json(messages)
    }
  })
  // res.json(messages)
})

/* GET user by ID. */
router.get('/messages/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(messages[id])
  } else {
    res.sendStatus(404)
  }
})

router.post('/messages', function(req, res, next) {
  let message = new Message(Object.assign({
    posted: new Date(),
    user_id: 'no_name',
    user_name: 'ななし'
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
