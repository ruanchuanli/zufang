import { getItems } from '@/utils/storage';
import Vue from 'vue';

import Vuex, { Store } from 'vuex'
Vue.use(Vuex)

const store = new Store({
    state: {
        user: {
            token:getItems('zufangtoken')
        },
    },

    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    }
})

export default store