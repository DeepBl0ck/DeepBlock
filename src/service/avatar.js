import api from "@/service/api";

export default {
	getAvatar: ()=> api.get("/u/avatar"),
	deleteAvatar: () => api.delete("/u/avatar"),
	updateAvatar: (data, config) => api.put("/u/avatar", data, config)
}