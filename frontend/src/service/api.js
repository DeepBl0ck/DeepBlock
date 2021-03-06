import axios from "axios";
import swal from "@/util/swal";

const api = axios.create({
	baseURL: `http://${window.location.host}/api`,
	browserBaseURL: "http://localhost/api",
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
	if (err?.response?.status === 401) {
		localStorage.removeItem('userinfo');
		swal.sessionExpired()
			.then(() => window.location = '/login');
	} else return Promise.reject(err);
});
export default api;
