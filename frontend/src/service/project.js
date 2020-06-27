import api from "@/service/api"

export default {
    get: () => api.get("/u/project"),
    add: (project) => api.post("/u/project", project),
    delete: (project) => api.delete(`/u/project/${project}`)

}