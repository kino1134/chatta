class ErrorJson {
  constructor (data = {}) {
    if (typeof data === 'string') {
      this._topMessage = data
      this._fields = {}
    } else {
      this._topMessage = data.top || ''
      this._fields = data.fields || {}
    }
  }

  get top () {
    return this._topMessage
  }

  msg (name) {
    return (this._fields[name] || {}).msg
  }

  class (name) {
    return { 'is-danger': !!this.msg(name) }
  }
}

export default ErrorJson
