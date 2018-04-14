import mongoose from '../mongoose'

const schema = new mongoose.Schema({
  room_id: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9_.-]+$/
  },
  room_name: String,
  room_type: {
    type: String,
    required: true,
    enum: ['public', 'private', 'direct']
  },
  description: String,
  direct_users: {
    type: [String],
    index: true
  }
})

export default mongoose.model('Room', schema)
