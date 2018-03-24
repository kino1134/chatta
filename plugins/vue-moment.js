import Vue from 'vue'
import moment from 'moment'
import VueMoment from 'vue-moment'

moment.locale('ja')
Vue.use(VueMoment, moment)
