import avatar from "@/service/avatar";

export const SET_AVATAR = "set_avatar"
export const GET_AVATAR = "get_avatar"
export const UPDATE_AVATAR = "update_avatar"
export const DELETE_AVATAR = "delete_avatar"

export default ({
	namespaced: true,
	state: {
		avatar: null,
	},
	getters: {
		avatar: (state) => state.avatar
	},
	mutations: {
		[SET_AVATAR](state, data) {
			state.avatar = data
		},
	},
	actions: {
		[GET_AVATAR]({ commit }) {
			return avatar.getAvatar()
				.then(res => {
					commit(SET_AVATAR, res.data.avatar)
				})
				.catch(err => {
					return Promise.resolve(err)
				})
		},
		[UPDATE_AVATAR]({ commit }, data, config) {
			return avatar.updateAvatar(data, config)
				.then(() => {
					commit(SET_AVATAR, data)
				})
		},
		[DELETE_AVATAR]({ commit }) {
			return avatar.deleteAvatar()
				.then(() => {
					commit(SET_AVATAR, "")
				})
				.catch(err => {
					console.log(`store::avatar::DELETE_AVATAR : ${err}`)
					return Promise.resolve(err)
				})
		}
	}
})