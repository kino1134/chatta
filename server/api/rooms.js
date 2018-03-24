import { Router } from 'express'

const router = Router()

// Mock rooms
const rooms = [
  { name: 'ルームＡＡ', type: 'favorite' },
  { name: 'ルームＢＢ', type: 'favorite' },
  { name: 'ルームＣＣ', type: 'favorite' },
  { name: 'ルームでＤＤＤＤＤＤＤＤＤＤＤＤＤあ', type: 'public' },
  { name: 'ルームＥＥ', type: 'public' },
  { name: 'ルームＦＦ', type: 'public' },
  { name: 'ルームＧＧ', type: 'private' },
  { name: 'ルームＨＨ', type: 'private' },
  { name: 'ルームＩＩ', type: 'private' },
  { name: 'Sあいさん', type: 'direct' },
  { name: 'Sびーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sしーさん', type: 'direct' },
  { name: 'Sでぃーさん', type: 'direct' },
]

/* GET users listing. */
router.get('/rooms', function (req, res, next) {
  res.json(rooms)
})

/* GET user by ID. */
router.get('/rooms/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < rooms.length) {
    res.json(rooms[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
