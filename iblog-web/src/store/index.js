import Vuex from 'vuex'
import Vue from 'vue'

import {getToken,getUser} from '@/request/token'

Vue.use(Vuex)

const state = {
  baseShow: true,
  activeIndex: '/',
  user:getUser(),
  token: getToken()
}

const store = new Vuex.Store({
  state
})


export default store
