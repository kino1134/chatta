import { Router } from 'express'
import Room from '../models/Room'
import User from '../models/User'
import { validate, notBlank } from '../utils/validate'

const router = Router()

/* GET users listing. */
router.get('/rooms', function (req, res, next) {
  Room.find({}, (err, rooms) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(rooms)
    }
  })
})

/* GET user by ID. */
router.get('/rooms/:id', function (req, res, next) {
  Room.findOne({ room_id: req.params.id }, (err, room) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(room)
    }
  })
})

router.post('/rooms',
  ...validate([
    notBlank('room_id')
    .matches(/^[a-z0-9_.-]+$/i).withMessage('使用できない文字が含まれています。')
    .not().isIn(['create']).withMessage('予約されています。')
    .custom((value) => {
      return Room.findOne({ room_id: value }).then(room => {
        if (room) { throw new Error('exists Room') }
      })
    }).withMessage('すでに使われているIDです。'),
    notBlank('room_type').isIn(['public', 'private', 'direct'])
  ]),
  function(req, res, next) {
    const room = new Room(Object.assign({}, req.body))
    room.save((err, obj) => {
      if (err) {
        res.status(500).json(err)
      } else {
        if (obj.room_type !== 'public') {
          req.user.room_list.push(obj.room_id)
          req.user.save((err_u, obj_u) => {
            res.json(obj)
          })
        }
      }
    })
})


export default router
