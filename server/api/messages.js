import { Router } from 'express'

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
  res.json(messages)
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

export default router
