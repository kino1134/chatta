export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, { user }) {
    state.user = user
  }
}

export const getters = {
  isAuth (state, getters) {
    return !!getters.loginUser
  },
  loginUser (state) {
    return state.user
  }
}
