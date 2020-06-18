import jwtdecode from "jwt-decode";
import auth from "@/service/auth";

export const LOGIN = "login";
export const LOGOUT = "logout";
export const SET_TOKEN = "set_token";
export const CLEAR_TOKEN = "clear_token";

export default {
	namespaced: true,
	state: {
		token: null,
		payload: null,
	},
	getters: {
		isLoggedin: (state) => null !== state.token,
		payload: (state) => state.payload,
		token: (state) => state.token,
		username: (state) => null !== state.payload ? state.payload.username : null,
		email: (state) => null !== state.payload ? state.payload.email : null,
	},
	mutations: {
		[SET_TOKEN]: (state, { token, payload }) => {
			state.token = token;
			state.payload = payload;
		},
		[CLEAR_TOKEN]: (state) => {
			state.token = null;
			state.payload = null;
		},
	},
	actions: {
		[LOGIN]: ({ commit }, user) => {
			return auth.login(user)
				.then((res) => {
					const { data: { token } } = res;
					const payload = jwtdecode(token);
					console.log(`store::auth::login token pay : ${JSON.stringify(payload)}`);
					commit(SET_TOKEN, { token, payload });
					return payload;
				})
				.catch((err) => {
					console.log(err.response)
					const { message } = err.response ? err.response.data : err;
					return Promise.reject(message);
				});
		},
		[LOGOUT]: ({ commit }) => {
			return commit(CLEAR_TOKEN)
		}
	},
	modules: {},
};
