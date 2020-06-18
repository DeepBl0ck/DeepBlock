import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const avatar = {
    namespaced: true,
    state: {
        avatar: ""
    },
    actions,
    mutations,
    getters,
}

