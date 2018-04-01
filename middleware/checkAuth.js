import axios from '~/plugins/axios'

export default async function ({ store, redirect }) {
  if (!store.getters['user/isAuth']) {
    await axios.get('/api/users/my').then((res) => {
      store.commit({
        type: 'user/setUser',
        user: res.data
      })
    }).catch((err) => {
      console.log(err)
      return redirect('/signIn')
    })
  }
}
