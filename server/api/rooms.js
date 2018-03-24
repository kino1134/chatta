import { Router } from 'express'

const router = Router()

// Mock rooms
const rooms = [
  { room_id: '1',  name: 'ルームＡＡ', type: 'favorite' },
  { room_id: '2',  name: 'ルームＢＢ', type: 'favorite' },
  { room_id: '3',  name: 'ルームＣＣ', type: 'favorite' },
  { room_id: '4',  name: 'ルームでＤＤＤＤＤＤＤＤＤＤＤＤＤあ', type: 'public' },
  { room_id: '5',  name: 'ルームＥＥ', type: 'public' },
  { room_id: '6',  name: 'ルームＦＦ', type: 'public' },
  { room_id: '7',  name: 'ルームＧＧ', type: 'private' },
  { room_id: '8',  name: 'ルームＨＨ', type: 'private' },
  { room_id: '9',  name: 'ルームＩＩ', type: 'private' },
  { room_id: '10', name: 'Sあいさん', type: 'direct' },
  { room_id: '11', name: 'Sびーさん', type: 'direct' },
  { room_id: '12', name: 'Sしーさん', type: 'direct' },
  { room_id: '13', name: 'Sしーさん', type: 'direct' },
  { room_id: '14', name: 'Sしーさん', type: 'direct' },
  { room_id: '15', name: 'Sしーさん', type: 'direct' },
  { room_id: '16', name: 'Sしーさん', type: 'direct' },
  { room_id: '17', name: 'Sしーさん', type: 'direct' },
  { room_id: '18', name: 'Sしーさん', type: 'direct' },
  { room_id: '19', name: 'Sしーさん', type: 'direct' },
  { room_id: '20', name: 'Sしーさん', type: 'direct' },
  { room_id: '21', name: 'Sしーさん', type: 'direct' },
  { room_id: '22', name: 'Sしーさん', type: 'direct' },
  { room_id: '23', name: 'Sでぃーさん', type: 'direct' },
]

/* GET users listing. */
router.get('/rooms', function (req, res, next) {
  res.json(rooms)
})

/* GET user by ID. */
router.get('/rooms/:id', function (req, res, next) {
  const room = rooms.find(x => x.room_id === req.params.id)
  if (room) {
    res.json(room)
  } else {
    res.sendStatus(404)
  }
})

export default router
