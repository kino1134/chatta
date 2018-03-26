import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  user_name:  String,
  user_id:    String,
  room_id:    String,
  body:       String,
  posted:     Date
})

export default mongoose.model('Message', messageSchema)
