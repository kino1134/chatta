import Vue from 'vue'
import axios from '~/plugins/axios'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, { user }) {
    state.user = user
  },
  setFavorite (state, { roomId, value }) {
    const room = state.user.room_list.find((x) => x.room_id === roomId)
    Vue.set(room, 'favorite', value)
  }
}

export const getters = {
  isAuth (state, getters) {
    return !!getters.loginUser
  },
  loginUser (state) {
    return state.user
  },
  favoriteRoomIdList (state) {
    return state.user.room_list.filter(x => x.favorite).map(x => x.room_id)
  }
}

export const actions = {
  toggleFavorite ({ commit, state }, { roomId }) {
    axios.post('/api/users/favorite/' + roomId).then((res) => {
      commit({
        type: 'setFavorite',
        roomId: roomId,
        value: res.data.room_list.find(x => x.room_id === roomId).favorite
      })
    })
  }
}
