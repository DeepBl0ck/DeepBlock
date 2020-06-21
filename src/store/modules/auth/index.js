import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const auth = {
    namespaced: true,
    state: {
        token: null,
        payload: null
    },
    actions,
    mutations,
    getters,
}

