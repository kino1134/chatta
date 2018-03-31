import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user_name:  String,
  user_id:    String,
  room_id:    String,
  body:       String,
  posted:     Date
})

export default mongoose.model('Message', schema)
