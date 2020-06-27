import avatar from "@/service/avatar"

export default {
    getAvatar({ commit }) {
        return avatar.getAvatar()
            .then(res => {
                commit('SET_AVATAR', res.data.avatar)
            })
            .catch(err => {
                return Promise.resolve(err)
            })
    },
    updateAvatar({ commit }, formdata, config) {
        return avatar.updateAvatar(formdata, config).then(() => {
            commit('CLEAR_AVATAR')
        })
            .catch(err => {
                console.log(`store::avatar::UPDATE_AVATAR : ${err}`)
                return Promise.resolve(err)
            })
    },
    deleteAvatar({ commit }) {
        return avatar.deleteAvatar()
            .then(() => {
                commit('CLEAR_AVATAR')
            })
            .catch(err => {
                console.log(`store::avatar::DELETE_AVATAR : ${err}`)
                return Promise.resolve(err)
            })
    }
}
