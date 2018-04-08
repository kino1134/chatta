import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user_name:  String,
  user_id: {
    type: String,
    index: true
  },
  room_id: {
    type: String,
    index: true
  },
  body:       String,
  posted:     Date
})

export default mongoose.model('Message', schema)
