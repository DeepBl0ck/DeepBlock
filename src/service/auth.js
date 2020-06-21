import api from "@/service/api";

export default {
	register: user => api.post("/register", user),
	login: user => api.post("/login", user),
	findID: email => api.post("/findid", email),
	findPassword: user => api.put("/findpasswd", user),
	changePassword: after_pw => api.put("/u/passwd", after_pw),
	checkPassword: pw => api.post("/u/checkpasswd", pw),
	deleteAccount: pw => api.delete("/u/unregister", pw)
};