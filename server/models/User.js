import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9_]+$/
  },
  user_name: {
    type: String
  },
  e_mail: String,
  password: {
    type: String,
    required: true
  }
})

schema.statics.authenticate = function (user_id, password, done) {
  model.findOne({ user_id: user_id }, function (err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false)
    }
    if (user.password !== password) { // TODO パスワードを平文で入れている
      return done(null, false)
    }
    return done(null, user)
  })
}
schema.statics.serializeUser = function (user, done) {
  done(null, user.id)
}
schema.statics.deserializeUser = function (id, done) {
  model.findById(id, function (err, user) {
    done(err, user)
  })
}

const model = mongoose.model('User', schema)

export default model
