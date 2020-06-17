import api from "@/service/api";
// import Swal from "sweetalert2";


export default {
	getAvatar: ()=> api.get("/u/avatar"),
	deleteAvatar: () => api.delete("/u/avatar"),
	updateAvatar: (data, config) => api.put("/u/avatar", data, config)
}