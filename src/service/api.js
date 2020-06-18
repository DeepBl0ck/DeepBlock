import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
	baseURL: "http://15.165.165.54:8001/api",
	timeout: 5000,
	withCredentials: true,
	headers: { "X-Requested-With": "XMLHttpRequest" },
});

api.interceptors.request.use(
	config => {
		if (typeof localStorage.userinfo !== 'undefined' && localStorage.userinfo !== 'undefined'){
			const {token} = JSON.parse(localStorage.userinfo).auth
			config.headers['x-access-token'] = `${token}`
		}
		return config
	},
	err => Promise.reject(err)
);

api.interceptors.response.use((res) => {
	return res;
}, (err) => {
	if (!!err.response && err.response.status === 403) {
		console.log(`service::api catch 403`)
		localStorage.removeItem('userinfo');
		Swal.fire({
			title: "Session Expired",
			text: "Your session has expired. Would you like to be redirected to the login page?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes",
			closeOnConfirm: false
		})
		.then((res)=>{
			console.log(`API::RES ${JSON.stringify(res)}`)
			window.location = '/login';
		});
	} else return Promise.reject(err);
});
export default api;