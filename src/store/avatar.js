import avatar from "@/service/avatar";

export const SET_AVATAR = "set_avatar"
export const GET_AVATAR = "get_avatar"
export const CLEAR_AVATAR = "clear_avatar"
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
		[CLEAR_AVATAR](state) {
			state.avatar = null
		}
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
		[UPDATE_AVATAR]({ commit }, formdata, config) {
			return avatar.updateAvatar(formdata, config).then(() => {
				commit(CLEAR_AVATAR)
			})
				.catch(err => {
					console.log(`store::avatar::UPDATE_AVATAR : ${err}`)
					return Promise.resolve(err)
				})
		},
		[DELETE_AVATAR]({ commit }) {
			return avatar.deleteAvatar()
				.then(() => {
					commit(CLEAR_AVATAR)
				})
				.catch(err => {
					console.log(`store::avatar::DELETE_AVATAR : ${err}`)
					return Promise.resolve(err)
				})
		}
	}
})