import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

const api = axios.create(options)

api.interceptors.response.use((res) => {
  console.log(res)
  return Promise.resolve(res)
}, (err) => {
  console.log(err.response)
  return Promise.reject(err)
})

export default api
