import axios from "axios";
import swal from "@/util/swal";

const api = axios.create({
	baseURL: "http://15.165.165.54:8001/api",
	headers: { "X-Requested-With": "XMLHttpRequest" },
});

api.interceptors.request.use(
	config => {
		if (localStorage?.userinfo ?? false) {
			const { token } = JSON.parse(localStorage?.userinfo).auth
			config.headers['x-access-token'] = `${token}`
		}
		return config
	},
	err => Promise.reject(err)
);

api.interceptors.response.use((res) => {
	return res;
}, (err) => {
	if (err?.response?.status === 403) {
		localStorage.removeItem('userinfo');
		swal.sessionExpired()
			.then(() => window.location = '/login');
	} else return Promise.reject(err);
});
export default api;