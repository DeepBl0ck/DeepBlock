import api from "@/service/api";

export default {
	register: user => api.post("/register", user),
	login: user => api.post("/login", user),
};
